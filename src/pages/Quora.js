import React from 'react'
import Feed from './Feed'
import Navbar from './Navbar'
import './Quora.css'
import Sidebar from './Sidebar'
import Wiget from './Wiget'

function Quora() {
    return (
        <div className='quora'>
            {/* 헤더 */}
            <Navbar />
            <div className='quora_content'>
                {/* 사이드바 */}
                <Sidebar />
                {/* 피드 */}
                <Feed />
                {/* 위젯 */}
                <Wiget />
            </div>
        </div>
    )
}

export default Quora