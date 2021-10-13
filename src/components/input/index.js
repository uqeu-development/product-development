import React, { useEffect } from 'react';
import XLSX from 'xlsx';
import { useAppContext } from '../../context';



const Input = () => {


    const { file, setFile, setConsoleMsg, setFileData } = useAppContext();

    const onFileUpload = (e) => {
        let f = e.target.files[0];
        setFile(f);
        setConsoleMsg(`${f.name} uploaded...`)
    }

    useEffect(() => {
        if (file !== "") {
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(file);
            fileReader.onload = (event) => {
                let data = event.target.result;
                let workbook = XLSX.read(data, { type: "binary" })
                let skus = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);
                setConsoleMsg('converting XLSX to JSON...')
                setFileData(skus);
            }
        }
    }, [file])

    return (
        <div className='input-container'>
            <h3>Upload file</h3>
            <p>Download template <a href="/" target="_blank">here</a>.</p>
            <input type="file" onChange={(e) => onFileUpload(e)}></input>
        </div>
    )
}

export default Input;