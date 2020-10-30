import React, {useState} from 'react';
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import FileInput from './FileInput';

function CountingSort() {
    const [file, setfile] = useState()

    return (
        <div>
            <div>
                <h1 className = 'px-4 py-2 font-weight-bold mb-0 bg-light-gray'>Counting Sort</h1>
            </div>
            <MDBContainer className = 'm-3'>
                <MDBRow>
                    <MDBCol>
                        <FileInput />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default CountingSort;
