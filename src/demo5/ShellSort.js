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
            label: '公司縮寫',
            field: 'Symbol',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Symbol',
            }
          },{
            label: '公司全名',
            field: 'Name',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Name',
            }
          },{
            label: '公司所屬分類',
            field: 'Sector',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Sector',
            }
          },{
            label: '股價',
            field: 'Price',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Price',
            }
          },{
            label: '本益比',
            field: 'PE',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Price/Earnings',
            }
          },{
            label: '收益率',
            field: 'DY',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Dividend Yield',
            }
          },{
            label: '每股盈餘',
            field: 'ES',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Earnings/Share',
            }
          }
          ,{
            label: '52 週低點',
            field: '52Low',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': '52 Week Low',
            }
          }
          ,{
            label: '52 週高點',
            field: '52High',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': '52 Week High',
            }
          }
          ,{
            label: '市場資本',
            field: 'MC',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Market Cap',
            }
          }
          ,{
            label: 'EBITDA',
            field: 'EBITDA',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'EBITDA',
            }
          },{
            label: '市銷率',
            field: 'PC',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Price/Sales',
            }
          }
          ,{
            label: '市賬率',
            field: 'PB',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'Price/Book',
            }
          },{
            label: '美國公司財報網址',
            field: 'SF',
            "attributes" : {
              'aria-controls': 'DataTable',
              'aria-label': 'SEC Filings',
            }
          }
    ]

    useEffect(() => {
        if(files[selectNum])
        {
            setoutput(files[selectNum].file);
        }
    }, [selectNum,files]);

    useEffect(() => {
        const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
        let lines;
        if(output)
        {
            lines = files[selectNum].file
            .split('\n')
            .slice(1)                                       // 刪除第一行header
            .filter((ele) => (ele.trim() !== ''))           // 刪除只含有空白字元或換行的 row
            .map((line) => {
              let splitArr =
              line
              .match(regex)                                 //過濾csv格式
              .map((ele) =>{
                if(ele[0] === ',')                          //過濾開頭','
                  return ele.slice(1)
                return ele
              }).map((ele) =>{
                if(ele[0] === '"')                           //過濾公司全名有'"'(雙引號)
                  return ele.substring(1, ele.length - 1);
                return ele
              })

              let buf = {
                'Symbol' : splitArr[0],
                'Name' : splitArr[1],
                'Sector' : splitArr[2],
                'Price': splitArr[3],
                'PE' : splitArr[4],
                'DY' : splitArr[5],
                'ES' : splitArr[6],
                '52Low' : splitArr[7],
                '52High' : splitArr[8],
                'MC' : splitArr[9],
                'EBITDA' : parseInt(splitArr[10]),
                'PC' : splitArr[11],
                'PB' : splitArr[12],
                'SF' : splitArr[13],
              };
              if(buf.EBITDA < 0)
              {
                  buf = {...buf, EBITDA : <span className = 'text-danger'>{buf.EBITDA}</span>}
              }
              else if(buf.EBITDA === 0)
              {
                  buf = {...buf, "EBITDA" : <span className = 'text-warning'>{buf.EBITDA}</span>}
              }else if(buf.EBITDA < 1e10)
              {
                  buf = {...buf, "EBITDA" : <span className = 'text-success'>{buf.EBITDA}</span>}
              }else
              {
                  buf = {...buf, "EBITDA" : <span className = 'text-primary'>{buf.EBITDA}</span>}
              }
              return buf;
              }
          );
      }
      setrows(lines);
  }, [output])

  const sort = () =>{
      let rowscpy = [...rows];
      let gap = Math.floor(rowscpy.length / 2);
      while(gap > 0)
      {
        for(let i = gap, j; i < rowscpy.length; i++)
        {
          j = i;
          let tmp = {...rowscpy[j]};
          while(j >= gap && tmp.EBITDA.props.children > rowscpy[j - gap].EBITDA.props.children)
          {
            console.log(j);
              rowscpy[j] = {...rowscpy[j - gap]};
              // [rowscpy[j],rowscpy[j - gap]] = [rowscpy[j - gap],rowscpy[j]]
              j -= gap;
          }
          rowscpy[j] = {...tmp};
          // console.log([...rowscpy].map((ele, idx) => ele.EBITDA.props.children), i, j, gap)
        }
        gap = Math.floor(gap / 2);
      }
      setrows(rowscpy);               
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
                />
            </MDBContainer>
        </>
    )
}

export default CountingSort;
