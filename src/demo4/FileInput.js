import React, {useRef} from 'react'

function FileInput({setfile}) {
    const filebox = useRef(null);
    const label = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(`選擇檔案為：${filebox.current.files[0].name}`)
    }

    return (
        <form onSubmit = {onSubmit}>
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
            <button type="submit">Submit</button>
        </form>
    )
}

export default FileInput
