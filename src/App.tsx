import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from '@ethersproject/units'
import { Progress } from 'antd';

export default function App() {
  const { activateBrowserWallet, deactivate, library, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  return (
    <div>
      <div>
          {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
          {account && <button onClick={() => deactivate()}>Disconnect</button>}
      </div>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}