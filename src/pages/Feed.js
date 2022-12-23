import { query, collection, getDocs, orderBy } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react'
import './Feed.css'
import Post from './Post'
import QuoraBox from './QuoraBox'
import db from './../firebase';

function Feed() {
    const [posts, setPosts] = useState([]);

    const querySelectQuestions = async () => {
        const q = query(collection(db, 'questions'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                question: doc.data()
            })
        })
        setPosts(data);
    }

    useEffect(() => {
        querySelectQuestions()
    }, [posts])

    return (
        <div className='feed'>
            <QuoraBox />
            {posts?.map(({ id, question }) =>
                <Post
                    key={id}
                    postId={id}
                    image={question.imageUrl}
                    question={question.question}
                    timestamp={question.timestamp}
                    quoraUser={question.user}
                />)}
        </div>
    )
}

export default Feed