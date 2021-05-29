import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { ChainId, useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from '@ethersproject/units'
import { Space, Statistic } from 'antd';
import { Create } from './Create';
import { ExplorePage } from './stories/ExplorePage';
import * as ProjPreviewStories from './stories/ProjPreview.stories';
import { ProjPreviewProps } from './stories/ProjPreview';
import { Header } from './stories/Header';
import { CampaignPage } from './CampaignPage';

export default function App() {
  const { activateBrowserWallet, deactivate, account, chainId } = useEthers()
  const etherBalance = useEtherBalance(account)

  const campaigns = [
    {...ProjPreviewStories.Bike.args, contract: '0xe42d18d3aaa8ae86f51072122276d0e0985fbc10' } as ProjPreviewProps,
    {...ProjPreviewStories.Car.args, contract: '0xc3242f80c381f8dfd3fc5861d016d0c57d9e640c'} as ProjPreviewProps,
  ]

  return (
    <div>
      <Header account={account as string} onLogin={activateBrowserWallet} onLogout={deactivate} />
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Create />
          </Route>
          <Route path="/stats" >
            <Space direction="vertical">
              {account && <Statistic title="Address" value={account} />}
              {chainId && <Statistic title="ChainID" value={ChainId[chainId]} />}
              {etherBalance && <Statistic title="Balance (ETH)" value={formatEther(etherBalance)} />}
            </Space>
          </Route>
          <Route path="/explore">
            <ExplorePage {...{
              account: account as string, 
              onLogin: activateBrowserWallet, 
              onLogout: deactivate,
              campaigns
            }}/>
          </Route>
          <Route path="/campaigns/:address" component={CampaignPage}/>
        </Switch>
      </HashRouter>
    </div>
  )
}