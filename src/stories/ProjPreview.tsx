import React from 'react';

import { Card, Space, Typography } from 'antd';
import { ProjProgress, ProjProgressProps } from './ProjProgress';
import { HashRouter, Link } from 'react-router-dom';
import { CampaignData } from '../CampaignPage';
import { useContractCall } from '@usedapp/core';
import { Interface } from '@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface';
import { abi as CampaignABI } from "../truffleenv/build/contracts/Campaign.json"


const campaignIface = new Interface(CampaignABI);

export const ProjPreview: React.FC<CampaignData> = ({symbolFirst, currencySymbol, description, title, contract}) => {
    const contractData = useContractCall({abi: campaignIface, address: contract, method: "getStats", args: []});
    const [target, raised, endDate] = contractData ? contractData : [0, 0, 0]

    return (
    <HashRouter>
    <Link to={'campaigns/'+contract} >
        <Card style={{ "width": "85%", height: "inherit", "marginLeft": "auto", "marginRight":"auto"}}>
            <Typography.Title level={3}>{title}</Typography.Title>
            <Typography.Paragraph ellipsis={{rows: 3}} >
            {description ? description : "No description provided."}
            </Typography.Paragraph>
            <div style={{width: "100%"}}>
            <Space size="middle" direction="vertical" style={{"width": "inherit", "display": "block"}}>
            <ProjProgress {...{target, raised, endDate, symbolFirst, currencySymbol} as ProjProgressProps} />
            </Space>
            </div>
        </Card>
    </Link>
    </HashRouter>
)};