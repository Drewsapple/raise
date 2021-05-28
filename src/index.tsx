import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChainId, DAppProvider, Config, useEtherBalance, useEthers } from '@usedapp/core';

const config: Config = {
  readOnlyChainId: ChainId.Ropsten,
  readOnlyUrls: {
    [ChainId.Ropsten]: 'https://ropsten.infura.io/v3/a360947649f24936a45ebcdf22a48902',
    [ChainId.Kovan]: 'https://kovan.infura.io/v3/a360947649f24936a45ebcdf22a48902',
    [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/a360947649f24936a45ebcdf22a48902',
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/a360947649f24936a45ebcdf22a48902',
  },
  supportedChains: [
    ChainId.Ropsten
  ]
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
