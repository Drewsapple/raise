import React from 'react';

import { Card, Space, Typography } from 'antd';
import { ProjProgress, ProjProgressProps } from './ProjProgress';


export interface ProjPreviewProps {
    projprogressdata: ProjProgressProps,
    summary: string,
    title: string,
}


export const ProjPreview: React.FC<ProjPreviewProps> = ({projprogressdata, summary, title}) => (
    <Card style={{ "width": "85%", "height": 240, "margin-left": "auto", "margin-right":"auto"}}>
        <Typography.Title level={3}>{title}</Typography.Title>
        <div style={{width: "100%"}}>
        <Space size="middle" direction="vertical" style={{"width": "inherit", "display": "block"}}>
        <ProjProgress {...projprogressdata} />
        <Typography.Paragraph ellipsis={{rows: 3}} >
        {summary}
        </Typography.Paragraph>
        </Space>
        </div>
    </Card>
);