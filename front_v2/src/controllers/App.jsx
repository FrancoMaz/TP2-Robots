import React, { useState, useEffect } from 'react'

import "./../../src/controllers/home/home.scss";
import loadTp from '../../src/utils/AppHelper';
import tpAbi from '../utils/tp_abi';
import { useHistory } from "react-router-dom";


export function App() {

    const history = useHistory()
    const ethereum = window.ethereum
    const [addr, setAddr] = useState('')
    const [loadOk, setLoadOk] = useState(false)

    if(ethereum) {
        ethereum.on('accountsChanged', function(accounts){
            setAddr(accounts[0])
        })
    }

    function load () {
        loadTp()
        history.push("/home")
    }
    
    return (
        <div className="App">
                {ethereum && <p>Your Ethereum address: {addr}</p>}
                {!ethereum && <p>Not account detect</p>}
                <button name="loadContract"className="button-home button-home-intro" onClick={load}>Cargar contrato</button>
        </div>
    )
}