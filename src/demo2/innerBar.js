import React, {forwardRef, useEffect, useState} from 'react'
import './innerBar.css';
import {intToPoker} from './../demo1/poker_tool';

const InnerBar = React.memo(forwardRef(({data, curPick}, ref) => {   
    return (
        <div className = {`swap-item mx-1 ${(curPick[0] === data.id) ? 'pick' : ' '} ${(curPick[1] === data.id) ? 'pick' : ''}`}
            ref = {ref} key = {data}>
            <div className = 'font-weight-bold'>{`${intToPoker(data.data)} ${data.data}`}</div>
            <div className = "bar"
                style = {{height: `${data.data}px`}}>
                </div>
        </div>
    )
    
}))

export default InnerBar
