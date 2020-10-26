import React, {forwardRef, useEffect} from 'react'
import './innerBar.css';

const intToPoker = (pokerNum) =>{
    let poker = "";
    switch(pokerNum % 4)
    {
        case 0:
            poker = 'C';
            break;
        case 1:
            poker = 'D';
            break;
        case 2:
            poker = 'H';
            break;
        case 3:
            poker = 'S';
            break;
    }
    
    switch(Math.floor(pokerNum / 4))
    {
        case 0:
            poker += 'A';
            break;
        case 10:
            poker += 'J';
            break;
        case 11:
            poker += 'Q';
            break;
        case 12:
            poker += 'K';
            break;
        default:
            poker += (Math.floor(pokerNum / 4) + 1).toString();
        break;
    }
    return poker;
}

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
