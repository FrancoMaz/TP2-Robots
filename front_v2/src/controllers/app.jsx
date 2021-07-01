import React, { useState } from 'react'


export function App() {

    const ethereum = window.ethereum
    const [addr, setAddr] = useState('')

    if(ethereum) {
        ethereum.on('accountsChanged', function(accounts){
            setAddr(accounts[0])
        })
    }

    return (
        <div className="App">
                {ethereum && <p>Your Ethereum address: {addr}</p>}
                {!ethereum && <p>Not account detect</p>}
        </div>
    )
}