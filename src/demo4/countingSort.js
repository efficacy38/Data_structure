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
            },
          },{
            label: 'Remote IP',
            field: 'RI',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Remote IP',
            }
          },{
            label: 'Remote Group',
            field: 'RG',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Remote Group',
            }
          },{
            label: 'Remote User',
            field: 'RU',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'RU',
            }
          },{
            label: 'datetime',
            field: 'datetime',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'datetime',
            }
          },{
            label: 'HTTP method',
            field: 'HM',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'HM',
            }
          },{
            label: 'HTTP STATUS CODE',
            field: 'status',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'status',
            }
          },{
            label: 'Response Length (Bytes)',
            field: 'RL',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'RL',
            }
          },{
            label: 'HTTP Referer',
            field: 'HR',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'HTTP Referer',
            }
          },{
            label: 'HTTP X-Forwarded-For',
            field: 'HX',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'HTTP X-Forwarded-For',
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
        const regex = /(?: |^)("(?:(?:"")*[^"]*)*"|\[(?:[^\]]*)*\]|[^" \n]*)/g;
        let lines;
        if(output)
        {
            lines = output.split('\n')
            .map((line, idx) => {
                let splitArr = 
                line.match(regex)
                .map((ele) => (ele.trim()));

                let buf = {
                    "index": idx,
                    "RI": splitArr[0],
                    "RG": splitArr[1],
                    "RU": splitArr[2],
                    "datetime": splitArr[3],
                    "HM": splitArr[4],
                    "status": splitArr[5],
                    "RL": splitArr[6],
                    "HR": splitArr[7],
                    "HX": splitArr[8],
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
            // console.log(lines[17610], lines[17611]);
        }
        setrows(lines);
    }, [output])

    const sort = () =>{
        let nextRows = Array(rows.length);
        let statusCount = new Array(601);
        statusCount = statusCount.fill(0, 0, 601);
        statusCount[0] = -1;
        for(let i = 0; i < rows.length; i++)
        {
            statusCount[rows[i].status.props.children]++;
            // console.log(rows[i].status.props.children, statusCount[rows[i].status.props.children], i)
        }

        for(let i = 1; i < 600; i++)
        {
            statusCount[i] = statusCount[i - 1] + statusCount[i];
        }

        for(let i = rows.length - 1; i >= 0 ; i--)
        {
            nextRows[statusCount[rows[i].status.props.children]--] = rows[i];        //we change status while load file
        }
        setrows(nextRows);
        console.log('sort done')
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
                 responsive
                 materialSearch
                />
            </MDBContainer>
        </>
    )
}

export default CountingSort;
