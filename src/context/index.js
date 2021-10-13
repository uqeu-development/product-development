
import React, { useContext, useState, useEffect } from 'react';

const appContext = React.createContext();

const AppProvider = ({ children }) => {

    const [consoleMsg, setConsoleMsg] = useState("waiting on file upload...");
    const [file, setFile] = useState("");
    const [output, setOutput] = useState("");
    const [fileData, setFileData] = useState("");
    const [skus, setSkus] = useState([]);
    const [json, setJson] = useState({})



    return (
        <appContext.Provider value={{ consoleMsg, setConsoleMsg, file, setFile, output, setOutput, fileData, setFileData, skus, setSkus, json, setJson }}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(appContext)
}

export { AppProvider, appContext }