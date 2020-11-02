import React, {useEffect, useState} from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBDataTableV5, MDBBtn } from 'mdbreact';
import FileInput from './FileInput';

function CountingSort() {
    const [files, setfiles] = useState([]);
    const [output, setoutput] = useState(null);
    const [rows, setrows] = useState(null);
    const [selectNum, setselectNum] = useState(0);

    const cols = [
        {
            label: '#',
            field: 'index',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'index',
            }
          },{
            label: 'ip',
            field: 'ip',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'ip',
            }
          },{
            label: 'method',
            field: 'method',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'method',
            }
          },{
            label: 'status',
            field: 'status',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'status',
            }
          },{
            label: 'output',
            field: 'output',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'output',
            }
          }

    ]

    useEffect(() => {
        if(files[selectNum])
        {
            setoutput(files[selectNum].file);
        }
    }, [selectNum]);

    useEffect(() => {
        let lines;
        if(output)
        {
            lines = files[selectNum].file.split('\n')
            .map((line, idx) => {
                let splitArr = line.split(' ');
                let buf = {
                    "index": idx,
                    "ip": splitArr[0],
                    "method": splitArr[5].substring(1),
                    "status": parseInt(splitArr[8]),
                    "output": line,
                };

                if(buf.status >= 100 && buf.status < 200)
                {
                    buf = {...buf, status : <span className = 'text-info'>{buf.status}</span>}
                }
                else if(buf.status >= 200 && buf.status < 300)
                {
                    buf = {...buf, "status" : <span className = 'text-success'>{buf.status}</span>}
                }else if(buf.status >= 300 && buf.status < 400)
                {
                    buf = {...buf, "status" : <span className = 'text-primary'>{buf.status}</span>}
                }else if(buf.status >= 400 && buf.status < 500)
                {
                    buf = {...buf, "status" : <span className = 'text-warning'>{buf.status}</span>}
                }else if(buf.status >= 500 && buf.status < 600)
                {
                    buf = {...buf, "status" : <span className = 'text-danger'>{buf.status}</span>}
                }
                return buf;
            });
        }
        console.log(lines);
        setrows(lines);
    }, [output, files])

    const sort = () =>{
        let nextRows = Array(rows.length);
        let statusCount = new Array(600);
        statusCount = statusCount.fill(0, 0, 600);

        for(let i = 0; i < rows.length; i++)
        {
            statusCount[rows[i].status.props.children]++;
            console.log(rows[i].status.props.children, statusCount[rows[i].status.props.children])
        }

        for(let i = 1; i < 600; i++)
        {
            statusCount[i] = statusCount[i - 1] + statusCount[i];
        }

        for(let i = rows.length - 1; i >= 0 ; i--)
        {
            nextRows[statusCount[rows[i].status.props.children]--] = rows[i];        //we change status while load file
        }
        // console.log(nextRows);
        setrows(nextRows);
    }

    return (
        <>
            <div>
                <h1 className = 'px-4 py-2 font-weight-bold mb-0 bg-light-gray'>Counting Sort</h1>
            </div>
            <MDBContainer className = 'pt-3'>
                <MDBRow center>
                    <MDBCol size = '4'>
                        <FileInput setfiles = {setfiles} files = {files}/>
                    </MDBCol>
                    <MDBCol size = '6' middle>
                        <select className="browser-default custom-select"
                         onChange = {(e) => {setselectNum(e.target.value);}}>
                            <option>Choose your option</option>
                            {
                                files.map((file, idx) =>(
                                <option value={idx} key = {idx}>{file.fileName}</option>
                                ))
                            }
                        </select>
                    </MDBCol>
                    <MDBCol size = '2'>
                        <MDBBtn onClick = {sort} disabled = {!output}>Sort</MDBBtn>
                    </MDBCol>
                    {/* {file} */}
                </MDBRow>
                <MDBDataTableV5
                 data = {
                     {
                        columns : cols,
                        rows : rows
                     }
                 }
                />
            </MDBContainer>
        </>
    )
}

export default CountingSort;
