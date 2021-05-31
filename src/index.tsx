import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChainId, DAppProvider, Config } from '@usedapp/core';
import { createClient, Provider } from 'urql';


const config: Config = {
  readOnlyChainId: ChainId.Ropsten,
  readOnlyUrls: {
    [ChainId.Ropsten]: 'https://ropsten.infura.io/v3/a360947649f24936a45ebcdf22a48902',
  },
  supportedChains: [
    ChainId.Ropsten
  ]
}

const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  fetchOptions: {
    headers: {
      authorization: `Bearer fnAEKa6NAnACAjbQ7jqx-OtZ_HyriN8HaQGfpfCo`
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client} >
      <DAppProvider config={config}>
        <App />
      </DAppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
