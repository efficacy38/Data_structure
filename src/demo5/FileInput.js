import React, {useRef, useState} from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './FileInput.css';


const Modal = ({files, setfiles}) =>{
    const [isOpen, setisOpen] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [isUpload, setisUpload] = useState(false)
    const filebox = useRef(null);
    const label = useRef(null);
    const [inputData, setinputData] = useState(null);

    const onChange = () =>{
        setisLoading(true);
        console.log("true");
        setinputData("");
        console.log(`選擇檔案為：${filebox.current.files[0].name}`)
        let reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
            setinputData(reader.result);
            setisLoading(false);
            console.log("false");
        }

    reader.readAsText(filebox.current.files[0]);
    setisUpload(true);
    }
    
    const toggle = () =>{
        setisOpen(!isOpen);
        setinputData("");
    };

    const saveChange = () =>{
        setfiles([...files, {
            "fileName":filebox.current.files[0].name,
            "file":inputData,
        }])
        toggle();
    }
    
    return(
        <MDBContainer>
        {/* BUTTON */}
        <MDBBtn color="info" onClick={toggle} style = {{width: "fit-content"}}>add Data</MDBBtn>
        {/* MODAL */}
        <MDBModal isOpen={isOpen} toggle={toggle}   size="lg">
          <MDBModalHeader toggle={toggle}>Add Data</MDBModalHeader>
          <MDBModalBody>

            {/* file input */}
            <form onChange = {onChange}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">
                        Upload
                        </span>
                    </div>
                    <div className="custom-file">
                        <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        ref = {filebox}
                        onChange = {
                            (e) =>{
                                // console.log(`選擇檔案為：${filebox.current.files[0].name}`)
                                label.current.innerText = filebox.current.files[0].name;
                            }
                        }
                        />
                        <label className="custom-file-label" htmlFor="inputGroupFile01" ref = {label}>
                        Choose file
                        </label>
                    </div>
                </div>
            </form>

            {/* preview row */}
            <hr />
            <h3 className = 'font-weight-bold'>preview</h3>
            <div style = {{wordBreak: "keep-all", overflow: "auto", whiteSpace: "pre", maxHeight: "50vh", height: "25vh"}}
             className = 'bg-light-gray'>
                    {isLoading && 
                    <div className = "w-100 h-100 d-flex justify-content-center align-items-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>}
                    {inputData}
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
            <MDBBtn color="primary" disabled = {!isUpload} onClick = {saveChange}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    )
}

export default Modal
