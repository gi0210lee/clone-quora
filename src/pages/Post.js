import React, { useCallback, useEffect, useState } from 'react'
import './Post.css'
import { Avatar } from '@mui/material';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOneOutlined, ShareOutlined } from '@mui/icons-material';
import PostModal from './PostModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuestionId, setQuestionInfo } from '../features/questionSlice';
import { collection, query, orderBy, getDocs, doc } from 'firebase/firestore/lite';
import db from './../firebase';


function Post({ postId, image, question, timestamp, quoraUser }) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dispatch = useDispatch();
    const questionId = useSelector(selectQuestionId)
    const [getAnswer, setGetAnswer] = useState([]);

    // const QuerySelectAnswer = useCallback(async () => {
    //     const docRefQuestions = doc(db, 'questions', questionId);
    //     const colRefAnswer = collection(docRefQuestions, 'answer')
    //     const q = query(colRefAnswer, orderBy('timestamp', 'desc'))
    //     const querySnapshot = await getDocs(q);

    //     const arr = []
    //     querySnapshot.forEach(doc => {
    //         arr.push({ id: doc.id, answers: doc.data() })
    //     })
    //     setGetAnswer(arr)
    // }, [questionId]);

    const QuerySelectAnswer = useCallback(async () => {
        const docRefQuestions = doc(db, 'questions', questionId);
        const colRefAnswer = collection(docRefQuestions, 'answer')
        const q = query(colRefAnswer, orderBy('timestamp', 'desc'))
        const querySnapshot = await getDocs(q);

        let data = []
        querySnapshot.forEach(doc => {
            data.push({ id: doc.id, answers: doc.data() })
        })
        setGetAnswer(data)
    }, [questionId]);

    const handlePostClick = () => {
        dispatch(setQuestionInfo({
            questionId: postId,
            questionName: question,
        }))
    }

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }
    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    useEffect(() => {
        if (questionId) {
            QuerySelectAnswer();
        };
    }, [questionId, QuerySelectAnswer])

    return (
        <div
            className='post'
            key={postId}
            onClick={handlePostClick}>
            <div className='post_info'>
                <Avatar src={quoraUser.photo} />
                <h5>{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</h5>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>

            <div className='post_body'>
                <div className='post_question'>
                    <p>{question}</p>
                    <button className='post_btnAnswer' onClick={handleOpenModal}>답변하기</button>
                    <PostModal
                        openModal={isOpenModal}
                        onCloseModal={handleCloseModal}
                        values={{
                            question: question,
                            displayName: quoraUser.displayName,
                            email: quoraUser.email,
                            timestamp: timestamp
                        }} />
                </div>

                <div className='post_answer'>
                    {getAnswer.map(({ id, answers }) => (
                        <p
                            key={id}
                            style={{
                                position: 'relative',
                                paddingBottom: '5px'
                            }}
                        >
                            {postId === answers.questionId
                                ? (<span>
                                    {answers.answer}
                                    <br />
                                    <span style={{
                                        // position: 'relative',
                                        color: 'yellowgreen',
                                        fontSize: 'small',
                                        display: 'flex',
                                        // textAlign: 'right',
                                        alignItems: 'space-between',
                                        justifyContent: 'flex-end',
                                        gap: '5px',
                                        // flexDirection: 'column',
                                        // right: '0px',
                                    }}>
                                        <span style={{ color: '#b92b27' }}>
                                            {answers.user.displayName ? answers.user.displayName : answers.user.email}
                                        </span>
                                        {new Date(timestamp?.toDate()).toLocaleString()} 에 작성함
                                    </span>

                                </span>)
                                : ''
                            }
                        </p>
                    ))}
                </div>
                <img src={image} alt='' />
            </div>

            <div className='post_footer'>
                <div className='post_footerAction'>
                    <ArrowUpwardOutlined />
                    <ArrowDownwardOutlined />
                </div>
                <RepeatOneOutlined />
                <ChatBubbleOutlineOutlined />
                <div className="post_fooerRight">
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div>
            </div>

        </div >
    )
}

export default Post