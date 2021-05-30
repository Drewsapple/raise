import React from 'react';

import { Progress, Space, Statistic } from 'antd';


export interface ProjProgressProps {
    target: number,
    raised: number,
    endDate?: number,
    symbolFirst?: boolean,
    currencySymbol: string | "",
    showTooltip?: boolean;
}

export const ProjProgress: React.FC<ProjProgressProps> = ({target, raised, endDate, currencySymbol, symbolFirst, showTooltip}) => (
    <div style={{width:"100%"}}>
        <Space size="middle" direction="vertical">
        <Statistic style={{width:"100%", display: "block"}} title={showTooltip && "Raised"} value=
        {
        symbolFirst ?
            `${currencySymbol || ""}${raised} / ${currencySymbol || ""}${target}`
        :
            `${raised}${currencySymbol || ""} / ${target}${currencySymbol || ""}`
        } />
        <Progress style={{width:"90%", "margin-left": "auto", "margin-right": "auto", display: "block"} as any} strokeLinecap="square" percent={raised/target*100} />
        </Space>
    </div>
);