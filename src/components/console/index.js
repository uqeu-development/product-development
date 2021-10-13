import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context';

const Console = () => {

    const consoleRef = useRef();
    const { consoleMsg } = useAppContext();

    useEffect(() => {
        const newMsg = `<pre>${consoleMsg}</pre>`
        consoleRef.current.innerHTML += newMsg;
    }, [consoleMsg])


    return <div className="console" ref={consoleRef}></div>
}

export default Console;