import React from 'react'
import WidgetOptions from './WidgetOptions'
import './Wiget.css'

function Wiget() {
    return (
        <div className='wiget'>
            <div className='widget_header'>
                <h5>광고입니다.</h5>
            </div>
            <div className='wiget_contents'>
                <WidgetOptions />
            </div>
        </div>
    )
}

export default Wiget