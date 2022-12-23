import React from 'react'
import './WidgetOptions.css'

const DEMO_DATE_WIDGET = [
    {
        id: 1,
        src: 'https://w.namu.la/s/a5710bee3cbb542c754ec1340ac69ccc54fb2e583fe967df1cfc675b4c0cf6c41fae884127d01593fa74173dbc7a98f1a7e3a19e0721bbf8263b89e4be6cdaddf470ace41668bafa11dfd01b6d0abdbaa1cc61f7fdde7b14c756f9088ffeaa53f47f1a894c424170080e0ba63a6e118b',
        title: '페페',
        desc: '슬픈 개구리'
    },
    {
        id: 2,
        src: 'https://w.namu.la/s/a5710bee3cbb542c754ec1340ac69ccc54fb2e583fe967df1cfc675b4c0cf6c41fae884127d01593fa74173dbc7a98f1a7e3a19e0721bbf8263b89e4be6cdaddf470ace41668bafa11dfd01b6d0abdbaa1cc61f7fdde7b14c756f9088ffeaa53f47f1a894c424170080e0ba63a6e118b',
        title: '페페',
        desc: '슬픈 개구리'
    },
    {
        id: 3,
        src: 'https://w.namu.la/s/a5710bee3cbb542c754ec1340ac69ccc54fb2e583fe967df1cfc675b4c0cf6c41fae884127d01593fa74173dbc7a98f1a7e3a19e0721bbf8263b89e4be6cdaddf470ace41668bafa11dfd01b6d0abdbaa1cc61f7fdde7b14c756f9088ffeaa53f47f1a894c424170080e0ba63a6e118b',
        title: '페페',
        desc: '슬픈 개구리'
    },
    {
        id: 4,
        src: 'https://w.namu.la/s/a5710bee3cbb542c754ec1340ac69ccc54fb2e583fe967df1cfc675b4c0cf6c41fae884127d01593fa74173dbc7a98f1a7e3a19e0721bbf8263b89e4be6cdaddf470ace41668bafa11dfd01b6d0abdbaa1cc61f7fdde7b14c756f9088ffeaa53f47f1a894c424170080e0ba63a6e118b',
        title: '페페',
        desc: '슬픈 개구리'
    },

]

function WidgetOptions() {
    return (
        <div className='widgetOptions'>
            {DEMO_DATE_WIDGET.map((data) => (
                <div key={data.id} className='wiget_content'>
                    <img src={data.src} alt="" />
                    <div key={data.id} className='wiget_contentTitle'>
                        <h5>{data.title}</h5>
                        <p>{data.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WidgetOptions