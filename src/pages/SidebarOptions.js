import { Add } from '@mui/icons-material';
import React from 'react'
import './SidebarOptions.css'


const DEMO_DATA_OPTIONS = [
    {
        id: 0,
        img: 'https://picsum.photos/seed/0/200/100',
        caption: '정장'
    },
    {
        id: 1,
        img: 'https://picsum.photos/seed/1/200/100',
        caption: '격투기'
    },
    {
        id: 2,
        img: 'https://picsum.photos/seed/2/200/100',
        caption: '자동차'
    },
    {
        id: 3,
        img: 'https://picsum.photos/seed/3/200/100',
        caption: '야구'
    },
    {
        id: 4,
        img: 'https://picsum.photos/seed/4/200/100',
        caption: '요리'
    },
    {
        id: 5,
        img: 'https://picsum.photos/seed/5/200/100',
        caption: '축구'
    },
];

function SidebarOptions() {
    return (
        <div className='sidebarOptions'>
            {DEMO_DATA_OPTIONS.map((option, id) => (
                <div key={id} className='sidebarOption'>
                    <img src={option.img} alt='' />
                    <p>{option.caption}</p>
                </div>
            ))}
            <div className='sidebarOption'>
                <Add />
                <p className='text'>더보기</p>
            </div>
        </div>
    )
}

export default SidebarOptions