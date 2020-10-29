import React, {forwardRef, useEffect} from 'react'
import './innerBar.css';
import {intToPoker} from './../demo1/poker_tool';

const InnerBar = React.memo(forwardRef(({data, curPick}, ref) => {
    let classN = "";
    useEffect(() => {
       classN = `${curPick.fst === data ? 'pick' : ''} ${curPick.snd === data ? 'pick1' : ''}`
    }, [curPick])
    
    return (
        <div className = {`swap-item mx-1`} ref = {ref} key = {data}>
            <div className = 'font-weight-bold'>{`${intToPoker(data)} ${data}`}</div>
            <div className = "bar"
                style = {{height: `${data}px`}}>
                </div>
        </div>
    )
    
}))

export default InnerBar
