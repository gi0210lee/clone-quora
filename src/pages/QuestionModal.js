import React, { useState } from 'react'
import './QuestionModal.css'
import { Avatar, Input } from '@mui/material';
import { PeopleAltOutlined, ExpandMore, Link } from '@mui/icons-material';
import Modal from 'react-modal'
import { useSelector } from 'react-redux';
import { selectUser } from './../features/userSlice';
import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore/lite';
import db from './../firebase';

Modal.setAppElement('#root');

function QuestionModal({ openModal, onCloseModal }) {
    const user = useSelector(selectUser);
    const [input, setInput] = useState('');
    const [inputUrl, setInputUrl] = useState('');

    const queryInsertQuestions = async () => {
        const docRef = doc(collection(db, 'questions'));
        await setDoc(docRef, {
            question: input,
            imageUrl: inputUrl,
            timestamp: serverTimestamp(),
            user: user
        })
    }

    const handleQuestion = (e) => {
        e.preventDefault();

        queryInsertQuestions();

        setInput('')
        setInputUrl('')
        onCloseModal();
    }

    return (
        <div>
            <Modal
                className='question_modal'
                overlayClassName='question_overlay'
                isOpen={openModal}
                onRequestClose={onCloseModal}
                shouldCloseOnOverlayClick={false}
            // style={StyleModal}
            >
                <div className='modal_title'>
                    <h5>질문</h5>
                    <h5>공유하기</h5>
                </div>
                <div className='modal_info'>
                    <Avatar src={user.photo} />
                    <p>질문자 : {user.displayName ? user.displayName : user.email} </p>
                    <div className='modal_scope'>
                        <PeopleAltOutlined />
                        <p>전체공개</p>
                        <ExpandMore />
                    </div>
                </div>
                <div className='modal_field'>
                    <Input type='text' placeholder='6하 원칙을 작성하세요' required value={input} onChange={(e) => setInput(e.target.value)} />
                    <div className='modal_fieldLink'>
                        <Link />
                        <Input type='text' placeholder='url 링크만을 작성해주세요' value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
                    </div>
                </div>
                <div className='modal_buttons'>
                    <button className='modal_buttonOK' onClick={handleQuestion}>질문하기</button>
                    <button className='modal_buttonCancel' onClick={onCloseModal}>닫기</button>
                </div>
            </Modal>
        </div>
    )
}

export default QuestionModal