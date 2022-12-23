import React, { useState } from 'react'
import './PostModal.css'
import Modal from 'react-modal'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectQuestionId, selectQuestionName } from '../features/questionSlice';
import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore/lite';
import db from '../firebase';

Modal.setAppElement('#root');

function PostModal({ openModal, onCloseModal, values }) {
    const user = useSelector(selectUser);
    const questionId = useSelector(selectQuestionId)
    const questionName = useSelector(selectQuestionName)
    const [answer, setAnswer] = useState('');

    const QueryInsertAnswer = async () => {
        const docRefQuestions = doc(db, 'questions', questionId)
        const docRefAnswer = doc(collection(docRefQuestions, 'answer'));
        await setDoc(docRefAnswer, {
            questionId: questionId,
            timestamp: serverTimestamp(),
            answer: answer,
            user: user
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user, questionId, questionName)

        if (questionId) {
            QueryInsertAnswer();
        }

        setAnswer('');
        onCloseModal();
    }

    const handleChange = (e) => {
        e.preventDefault();

        setAnswer(e.target.value)
    }

    return (
        <div>
            <Modal
                className="post_modal"
                overlayClassName="post_overlay"
                isOpen={openModal}
                onRequestClose={onCloseModal}
                shouldCloseOnOverlayClick={false}
            // style={StyleModal}
            >
                <div className='modal_question'>
                    <h1>{values.question}</h1>
                    <p>
                        <span className='name'>
                            {values.dispalyName ? values.dispalyName : values.email}
                        </span>
                        {' '}로부터의 질문{' '}
                        <span className='time'>
                            {new Date(values.timestamp?.toDate()).toLocaleString()}
                        </span>
                    </p>
                </div>
                <div className='modal_answer'>
                    <textarea
                        placeholder='답변을 작성해주세요'
                        type='text'
                        value={answer}
                        onChange={handleChange}
                    />
                </div>
                <div><p>{`질문자 ${questionName}(${questionId})`}</p></div>

                <div className='modal_buttons'>
                    <button className='modal_buttonOK' type='submit' onClick={handleSubmit}>답변달기</button>
                    <button className='modal_buttonCancel' onClick={onCloseModal}>닫기</button>
                </div>
            </Modal >
        </div >
    )
}

export default PostModal