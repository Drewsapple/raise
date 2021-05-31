import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { ChainId, useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';
import { useQuery } from 'urql';
import { Col, Row, Space, Statistic } from 'antd';
import { Create } from './Create';
import { ExplorePage } from './stories/ExplorePage';
import { Header } from './stories/Header';
import { CampaignData, CampaignPage } from './CampaignPage';
import { useEffect, useState } from 'react';

export default function App() {
  const { activateBrowserWallet, deactivate, account, chainId } = useEthers()
  const etherBalance = useEtherBalance(account)

  const exploreQuery = `query ExplorePage {
    allCampaigns {
      data {
        contract
        title
        description
        currencySymbol
        symbolFirst
      }
    }
  }`;
  const [result] = useQuery({query: exploreQuery})

  const { data, fetching , error} = result;
  const [campaigns, setCampaigns] = useState([] as CampaignData[]);

  useEffect(() => {
    if(!fetching) {
      setCampaigns(data?.allCampaigns.data as CampaignData[] || []);
    }
  }, [fetching, data, campaigns]);

  error && console.log(error)

  return (
    <div>
      <Header account={account as string} onLogin={activateBrowserWallet} onLogout={deactivate} />
      <div style={{height: "5vh"}} />
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Row >
              <Col span={6}>
                <Create />
              </Col>
              <Col span={18}>
                <ExplorePage {...{
              account: account as string, 
              onLogin: activateBrowserWallet, 
              onLogout: deactivate,
              campaigns
            }}/>
              </Col>
            </Row>
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
          <Route path="/campaigns/:address" >
            <CampaignPage campaigns={campaigns} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}