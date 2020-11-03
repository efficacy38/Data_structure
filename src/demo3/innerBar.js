import React, {forwardRef} from 'react'
import './innerBar.css';

const InnerBar = React.memo(forwardRef(({data, curPick}, ref) => {   
    console.log(data);
    return (
        <div className = {`swap-item mx-1 ${(curPick[0] === data) ? 'pick' : ' '} ${(curPick[1] === data) ? 'pick' : ''}`}
            ref = {ref} key = {data}>

            <div className = "bar d-flex align-items-center justify-content-center"
                style = {{height: `${data * 10}px`, width: `${data * 10}px`, borderRadius: '50%'}}>
                    <span className = 'font-weight-bold d-flex text-white' >
                        {`${data}`}
                    </span>
            </div>
        </div>
    )
    
}))

export default InnerBar
