import { Col, Row } from 'antd';
import React from 'react';

import { Header } from './Header';
import './page.css';
import { ProjPreview, ProjPreviewProps } from './ProjPreview';

export interface ExplorePageProps {
  account?: string;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
  projects: ProjPreviewProps[]
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ account, onLogin, onLogout, onCreateAccount, projects }) => (
<article>
  <Header account={account} onLogin={onLogin} onLogout={onLogout} />
  <span/>
  <br/>
  <Row gutter={[24, 24]} align="bottom" justify="start" style={
    {
      "margin-left": "auto",
      "margin-right": "auto",
    }
  }>
    {projects.map((project: ProjPreviewProps) => (
      <Col sm={24} md={12} lg={8} xl={6} >
        <ProjPreview {...project}/>
      </Col>
    ))}
  </Row>
</article>
);
