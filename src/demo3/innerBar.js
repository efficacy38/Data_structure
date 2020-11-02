import React, {forwardRef} from 'react'
import './innerBar.css';

const InnerBar = React.memo(forwardRef(({data, curPick}, ref) => {   
    console.log(data);
    return (
        <div className = {`swap-item mx-1 ${(curPick[0] === data) ? 'pick' : ' '} ${(curPick[1] === data) ? 'pick' : ''}`}
            ref = {ref} key = {data}>
            <div className = 'font-weight-bold'>{`${data}`}</div>
            <div className = "bar"
                style = {{height: `${data}px`, width: `${data}px`, borderRadius: '50%'}}>
                </div>
        </div>
    )
    
}))

export default InnerBar
