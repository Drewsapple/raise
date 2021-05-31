import React from 'react';
import './page.css';
import { Card, Col, Divider, Row, Typography } from 'antd';
import { ProjPreview } from './ProjPreview';
import { CampaignData } from '../CampaignPage';

export interface ExplorePageProps {
  campaigns: CampaignData[];
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ campaigns }) => (
  <Card>
  <Typography.Title style={{textAlign: "center", width: "100%"}}>Campaigns</Typography.Title>
  <Divider/>
  <Row gutter={[24, 24]} align="top" justify="start" style={
    {
      "marginLeft": "auto",
      "marginRight": "auto"
    }
  }>
    {campaigns && campaigns.map((c: CampaignData) => {

      return (<Col sm={24} md={12} lg={8} key={c.contract} >
        <ProjPreview {...c}/>
      </Col>
      )
    })
    }
  </Row>
  </Card>
);
