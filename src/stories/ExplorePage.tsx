import { Col, Row } from 'antd';
import React from 'react';

import './page.css';
import { ProjPreview, ProjPreviewProps } from './ProjPreview';

export interface ExplorePageProps {
  campaigns?: ProjPreviewProps[];
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ campaigns }) => (
  <Row gutter={[24, 24]} align="bottom" justify="start" style={
    {
      "margin-left": "auto",
      "margin-right": "auto",
    } as any
  }>
    {campaigns && campaigns.map((project: ProjPreviewProps) => (
      <Col sm={24} md={12} lg={8} xl={6} >
        <ProjPreview {...project}/>
      </Col>
    ))}
  </Row>
);
