import React, {forwardRef, useEffect} from 'react'
import './innerBar.css';
import {intToPoker} from './poker_tool';

const InnerBar = React.memo(forwardRef(({data, curPick}, ref) => {
    return (
        <div className = {`swap-item mx-1 ${curPick === data ? 'pick' : ''}`} ref = {ref} key = {data}>
            <div className = 'font-weight-bold'>{`${intToPoker(data)} ${data}`}</div>
            <div className = "bar"
                style = {{height: `${data}px`}}>
                </div>
        </div>
    )
    
}))

export default InnerBar
