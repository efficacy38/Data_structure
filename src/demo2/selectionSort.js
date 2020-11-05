import React, {useState, useRef} from 'react'
import FlipMove from 'react-flip-move';
import {MDBInput, MDBBtn, MDBRow, MDBCol, MDBCard} from 'mdbreact'
import InnerBar from './innerBar';
import './../demo1/mainPg.css';
import {pokerToInt, intToPoker} from './../demo1/poker_tool';
import yourNightMare from './../demo1/img/Ber8i4x.jpg'

function SelectionSort() {
    const [data, setdata] = useState([]); //SA,S2,S3,S4,S5,S6,S7,S8,S9,S10,SJ,SQ,SK,DA,D2,D3,D4,D5,D6,D7,D8,D9,D10,DJ,DQ,DK,CA,C2,C3,C4,C5,C6,C7,C8,C9,C10,CJ,CQ,CK,HA,H2,H3,H4,H5,H6,H7,H8,H9,H10,HJ,HQ,HK
    const [input, setinput] = useState();
    const [log, setlog] = useState([]);
    const [curPick, setcurPick] = useState([]);

    const [dataLog, setdataLog] = useState([]);
    const dataLogForClosure = useRef([...dataLog]);

    const ref = useRef(null);
    const [aniSpeed, setaniSpeed] = useState(0.5);
    const aniSpeedForClosure = useRef(aniSpeed);

    let id = useRef(0);

    const addData = (e) =>{
        e.preventDefault();
        let inputdata = [...data, ...pokerToInt(input, id)];
        setdata(inputdata);
        setdataLog([inputdata.map(ele => ele.data)]);
        dataLogForClosure.current = [inputdata.map(ele => ele.data)];
        setinput('');
    }

    const insertionSort = () =>{
        setlog([]);
        let tmplog = [];
        let sortingData = data.slice(0, data.length);
        for(let i = 0, j = 0, maxi; i < sortingData.length; i++)
        {
            maxi = i;
            for(j = i; j < sortingData.length; j++)
            {
                if(sortingData[maxi].data < sortingData[j].data)  maxi = j;
            }

            if(maxi !== i)
            {
                [sortingData[i], sortingData[maxi]] = [sortingData[maxi], sortingData[i]];
                console.log([i, maxi, sortingData[i].id,  sortingData[maxi].id]);
                tmplog.push([i, maxi, sortingData[i].id,  sortingData[maxi].id]);
            }
        }
        setlog(tmplog);
    }


    const display = () =>{
        let sortingData = data.slice(0, data.length);
        let i = 0;
        const displayChange = () => {
            if(i < log.length){
                setcurPick([]);

                setTimeout(() => {
                    setcurPick([log[i][2],log[i][3]]);
                    console.log('pick', [sortingData[log[i][2]], sortingData[log[i][3]]]);
                }, 110);

                setTimeout(() => {
                    sortingData = sortingData.slice(0, sortingData.length);
                    [sortingData[log[i][0]], sortingData[log[i][1]]] = [sortingData[log[i][1]], sortingData[log[i][0]]];
                    dataLogForClosure.current = [...dataLogForClosure.current, sortingData.map(ele => ele.data)];
                    setdataLog(dataLogForClosure.current);
                    // console.log("done", log, i);
                    i++;
                    setdata(sortingData);
                }, ((aniSpeedForClosure.current - 0.2) / 2 + 0.11) * 1000);                 //add 110ms for disabing the active pick bar

                setTimeout(() => {
                    // console.log("aniSpeed", aniSpeedForClosure.current);
                    displayChange();
                }, aniSpeedForClosure.current * 1000);
            }else
            {
                setcurPick([]);
            }
        }
        displayChange();
        };

    return (
        <div>

            <h1 className = 'px-4 py-2 font-weight-bold mb-0 bg-light-gray'>Selection Sort</h1>
                <MDBRow className = 'm-3'>
                    <MDBCol  className = 'col-12 col-md-8 my-3'>
                        <MDBCard className = 'p-3 h-100'>
                            <FlipMove
                            staggerDelayBy={0}
                            className = "swap-items-container overflow-auto flex-fill"
                            duration = {(aniSpeed - 0.2) / 2 * 1000}
                            >
                            {data.map((data) => (
                                    <InnerBar
                                    key = {data.id}
                                    data = {data}
                                    curPick = {curPick}>
                                        {data}
                                    </InnerBar>
                                ))}
                            </FlipMove>
                            
                            <hr />

                            <MDBRow className = 'align-items-center justify-content-center'>
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
                                            min = {0.3}
                                            max = {1}
                                            onChange = {
                                                () => {
                                                    setaniSpeed(ref.current.valueAsNumber); 
                                                    aniSpeedForClosure.current = ref.current.valueAsNumber;
                                                    // console.log(ref.current.valueAsNumber, aniSpeed);
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
                                    <MDBCard key = {i} className = 'border border-light px-3 py-2 mx-3 my-1 font-weight-bold text-light-blue d-flex'>
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
                        <MDBCard className = 'img-container mt-3'>
                            <img alt = "probility?" src = {yourNightMare} style = {{padding: "1rem", height: "100%"}}/>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
        </div>
    )
}

export default SelectionSort;
