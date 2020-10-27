import React, {useState, useEffect, useRef, useCallback} from 'react'
import FlipMove from 'react-flip-move';
import {MDBInput, MDBContainer, MDBBtn, MDBRow, MDBCol, MDBCard} from 'mdbreact'
import InnerBar from './innerBar';
import './mainPg.css';
import {pokerToInt, intToPoker} from './poker_tool';

function MainPg() {
    const [data, setdata] = useState([]); //SA,S2,S3,S4,S5,S6,S7,S8,S9,S10,SJ,SQ,SK,DA,D2,D3,D4,D5,D6,D7,D8,D9,D10,DJ,DQ,DK,CA,C2,C3,C4,C5,C6,C7,C8,C9,C10,CJ,CQ,CK,HA,H2,H3,H4,H5,H6,H7,H8,H9,H10,HJ,HQ,HK
    const [input, setinput] = useState();
    const [log, setlog] = useState([]);
    const [curPick, setcurPick] = useState(null);

    const [dataLog, setdataLog] = useState([]);
    const dataLogForClosure = useRef([...dataLog]);

    const ref = useRef(null);
    const [aniSpeed, setaniSpeed] = useState(0.5);
    const aniSpeedForClosure = useRef(aniSpeed);

    

    const addData = (e) =>{
        e.preventDefault();
        let inputdata = [...data, ...pokerToInt(input)];
        setdata(inputdata);
        setdataLog([inputdata]);
        dataLogForClosure.current = [inputdata];
        setinput('');
    }

    const insertionSort = () =>{
        setlog([]);
        let tmplog = [];
        let sortingData = data.slice(0, data.length);
        for(let i = 1, j = 0; i < sortingData.length; i++)
        {
            let tmp = sortingData[i];
            tmplog.push({"from": i, "type": "beg"});
            for(j = i - 1; j >= 0 && (sortingData[j] < tmp); j--)
            {
                sortingData[j + 1] = sortingData[j];
                tmplog.push({"from": j, "to": j + 1, "type": "sw"});
            }
            sortingData[j + 1] = tmp;
            tmplog.push({"num": tmp, "to":j + 1, "type": "ins"});
        }
        setlog(tmplog);
    }


    const display = () =>{
        let sortingData = data.slice(0, data.length);
        let i = 0;
        const displayChange = () => {
            if(i < log.length){
                if(log[i].type === "sw")
                {
                    [sortingData[log[i].to], sortingData[log[i].from]] = [sortingData[log[i].from], sortingData[log[i].to]];

                    dataLogForClosure.current = [...dataLogForClosure.current, sortingData];
                    sortingData = sortingData.slice();
                    console.log('debug',dataLog, sortingData, [...dataLog, sortingData], dataLogForClosure.current)
                    setdataLog(dataLogForClosure.current);
                    setdata(sortingData);
                }else if(log[i].type === "beg"){
                    setcurPick(sortingData[log[i].from]);
                }else{      //type == ins
                    setcurPick(null);
                }
                i++;
                console.log("done", i);

                setTimeout(() => {
                    displayChange();
                    console.log("aniSpeed", aniSpeedForClosure);
                }, aniSpeedForClosure.current * 1000);
            }
        }
        displayChange();
        };

    return (
        <div>
            <MDBContainer className = 'bg-light-blue text-white m-0 pl-3 pt-3 pb-0 mw-100'>
                <h1 className = 'font-weight-bold mb-0'>Insertion Sort</h1>
            </MDBContainer>
            <hr className = "mx-0 mt-0 w-100 font-weight-500"/>

                <MDBRow className = 'm-3'>
                    <MDBCol  className = 'col-12 col-md-8 my-3'>
                        <MDBCard className = 'p-5 h-100'>
                            <FlipMove
                            staggerDelayBy={0}
                            className = "swap-items-container"
                            duration = {(aniSpeed - 0.1) * 1000}
                            >
                            {data.map((data) => (
                                    <InnerBar
                                    key = {data}
                                    data = {data}
                                    curPick = {curPick}>
                                        {data}
                                    </InnerBar>
                                ))}
                            </FlipMove>

                            <hr />
                            <MDBRow className = 'align-items-center justify-content-center flex-grow-1'>
                                <MDBCol className = 'col-md-4 col-12'>
                                    <form className = 'd-flex justify-content-center align-items-center'>
                                        <MDBInput
                                        className = 'd-flex'
                                        value = {input}
                                        onChange = {(e) =>{ setinput(e.target.value);}}
                                        label = "輸入撲克牌"
                                        />
                                        <MDBBtn
                                            className = 'd-flex bg-light-blue font-weight-bold'
                                            type = 'submit'
                                            onClick = {addData}
                                            disabled = {!input}>
                                            <span className = "text-center">submit</span>
                                        </MDBBtn>
                                    </form>
                                </MDBCol>
                                <MDBCol
                                    className = 'col-md-4 col-12'>
                                    <div className = 'm-3'>
                                    <label htmlFor = 'animate-speed-control' className = "font-weight-bold text-light-blue" >{`animation speed: ${aniSpeed} s`}</label>
                                        <input 
                                            ref = {ref}
                                            type = 'range'
                                            className = 'custom-range'
                                            id = 'animate-speed-control'
                                            value = {aniSpeed}
                                            step={0.01}
                                            min = {0.1}
                                            max = {1}
                                            onChange = {
                                                () => {
                                                    setaniSpeed(ref.current.valueAsNumber); 
                                                    aniSpeedForClosure.current = ref.current.valueAsNumber;
                                                    console.log(ref.current.valueAsNumber, aniSpeed);
                                                }}
                                            />
                                    </div>
                                </MDBCol>
                                <MDBCol  className = 'col-md-4 col-12 d-flex w-100'>
                                    <MDBBtn className = "bg-light-blue font-weight-bold d-flex flex-grow-1 px-0" onClick = {insertionSort}><span className = 'mx-auto'>insertionSort</span></MDBBtn>
                                    <MDBBtn className = "bg-light-blue font-weight-bold d-flex flex-grow-1 px-0" onClick = {display}><span className = 'mx-auto'>display</span></MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol className = 'col-12 col-md-4  my-3'>
                        <MDBCard className = 'overflow-auto log-container'>
                            <MDBCard className = 'font-weight-bold p-3 m-3 bg-dark-blue-gradient text-white px-3 h3'>log</MDBCard>
                            {
                                dataLog.map((data, i) =>
                                    <MDBCard key = {i} className = 'border border-light p-3 m-3 font-weight-bold text-light-blue d-flex'>
                                        <span className = 'd-flex aligin-self-start mr-auto'>{`step ${i + 1}:`}</span>
                                        <span className = 'd-flex aligin-self-end text-muted ml-auto text-break'>
                                                {
                                                `${data.map((data) => intToPoker(data))} `
                                                }
                                        </span>
                                    </MDBCard>
                                )
                            }
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
        </div>
    )
}

export default MainPg
