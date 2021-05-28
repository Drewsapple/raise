import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from '@ethersproject/units'
import { Progress } from 'antd';
import { ExplorePage } from './stories/ExplorePage';
import * as ProjPreviewStories from './stories/ProjPreview.stories';
import { ProjPreviewProps } from './stories/ProjPreview';

export default function App() {
  const { activateBrowserWallet, deactivate, library, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  return (
    <div>
      <ExplorePage {...{
        account: account as string, 
        onLogin: activateBrowserWallet, 
        onLogout: deactivate,
        projects: [
          ProjPreviewStories.Bike.args as ProjPreviewProps
        ]
      }}/>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}