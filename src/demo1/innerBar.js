import React, {forwardRef} from 'react'
import './innerBar.css';
import {intToPoker} from './poker_tool';

const InnerBar = React.memo(forwardRef(({data, curPick}, ref) => {
    console.log(data.id, curPick, data.id === curPick)
    return (
        <div className = {`swap-item mx-1 ${curPick === data.id ? 'pick' : ''}`} ref = {ref}>
            <div className = 'font-weight-bold'>{`${intToPoker(data.data)} ${data.data}`}</div>
            <div className = "bar"
                style = {{height: `${data.data}px`}}>
                </div>
        </div>
    )
    
}))

export default InnerBar
