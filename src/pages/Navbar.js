import React, { useState } from 'react'
import './Navbar.css'
import { Avatar, Button } from '@mui/material';
import { Home, Search, Window, AssignmentInd, Group, NotificationsNone, Language } from '@mui/icons-material';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import { signOut } from '@firebase/auth';
import QuestionModal from './QuestionModal';



function Navbar() {
    const user = useSelector(selectUser);
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            alert(err.message)
        }
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    return (
        <div className='navbar'>
            <div className='qHeader_logo'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/9/91/Quora_logo_2015.svg' alt="" />
            </div>

            <div className='qHeader_icons'>
                <div className='qHeader_icon'><Home /></div>
                <div className='qHeader_icon'><Window /></div>
                <div className='qHeader_icon'><AssignmentInd /></div>
                <div className='qHeader_icon'><Group /></div>
                <div className='qHeader_icon'><NotificationsNone /></div>
            </div>

            <div className='qHeader_input'>
                <input type='text' placeholder='검색하기' />
                <Search />
            </div>

            <div className='qHeader_Rem'>
                <div className='qHeader_avatar'>
                    <Avatar src={user?.photo} onClick={handleLogout} />
                </div>
                <Language />
                <Button onClick={handleOpenModal}>질문하기</Button>
                <QuestionModal openModal={openModal} onCloseModal={handleCloseModal} />
            </div >
        </div >
    )
}

export default Navbar