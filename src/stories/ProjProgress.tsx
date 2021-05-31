import React from 'react';
import {utils} from 'ethers'
import { Col, Progress, Row, Space, Statistic } from 'antd';
import moment from 'moment';

const {formatEther} = utils;

export interface ProjProgressProps {
    target: number,
    raised: number,
    endDate?: number,
    symbolFirst?: boolean,
    currencySymbol: string | "",
}

export const ProjProgress: React.FC<ProjProgressProps> = ({target, raised, endDate, currencySymbol, symbolFirst}) => {
    const targetString = formatEther(target).toString()
    const raisedString = formatEther(raised).toString()

    return (
    <div style={{width:"100%"}}>
        <Space size="middle" direction="vertical" style={{width:"inherit"}}>
        <Row>
            <Col span={24}>
            <Progress style={{width:"100%", verticalAlign: "baseline", margin: "auto", display: "block"}} strokeLinecap="square" percent={raised/target*100} />
            </Col>
            <Col sm={24} lg={12}>
                <Statistic style={{width:"100%", display: "block"}} title="Raised" value=
                {
                symbolFirst ?
                    `${raisedString} of ${currencySymbol || ""}${targetString}`
                :
                    `${raisedString} of ${targetString}${currencySymbol || ""}`
                } />
            </Col>
            <Col sm={24} lg={12}>
            {endDate && <Statistic title="Fundraising Deadline" value={moment.unix(endDate).fromNow()} />}
            </Col>
        </Row>
        </Space>
    </div>
)};