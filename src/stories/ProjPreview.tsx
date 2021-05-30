import React from 'react';

import { Card, Space, Typography } from 'antd';
import { ProjProgress, ProjProgressProps } from './ProjProgress';
import { HashRouter, Link } from 'react-router-dom';


export interface ProjPreviewProps {
    projprogressdata: ProjProgressProps,
    summary?: string,
    title: string,
    contract: string,
}


export const ProjPreview: React.FC<ProjPreviewProps> = ({projprogressdata, summary, title, contract}) => (
    <HashRouter>
    <Link to={'campaigns/'+contract} >
        <Card style={{ "width": "85%", "height": 240, "marginLeft": "auto", "marginRight":"auto"}}>
            <Typography.Title level={3}>{title}</Typography.Title>
            <div style={{width: "100%"}}>
            <Space size="middle" direction="vertical" style={{"width": "inherit", "display": "block"}}>
            <ProjProgress {...projprogressdata} />
            <Typography.Paragraph ellipsis={{rows: 3}} >
            {summary ? summary : "No description provided."}
            </Typography.Paragraph>
            </Space>
            </div>
        </Card>
    </Link>
    </HashRouter>
);