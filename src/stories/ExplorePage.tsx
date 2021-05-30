import React from 'react';
import './page.css';
import { Col, Row } from 'antd';
import { ProjPreview, ProjPreviewProps } from './ProjPreview';
import { CampaignData } from '../CampaignPage';

export interface ExplorePageProps {
  campaigns: CampaignData[];
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ campaigns }) => (
  <Row gutter={[24, 24]} align="bottom" justify="start" style={
    {
      "margin-left": "auto",
      "margin-right": "auto",
    } as any
  }>
    {campaigns && campaigns.map((c: CampaignData) => (
      <Col sm={24} md={12} lg={8} xl={6} >
        <ProjPreview {...{
          title: c.title,
          summary: c.description,
          contract: c.contract,
          projprogressdata: {
            currencySymbol: c.currencySymbol,
            symbolFirst: c.symbolFirst,
            target: c.target,
            raised: 696969
          }
        } as ProjPreviewProps}/>
      </Col>
    ))}
  </Row>
);
