import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import React from 'react';

import { Button } from './Button';
import './header.css';

export interface HeaderProps {
  account?: string;
  onLogin: () => void;
  onLogout: () => void;
}

function buildRamp(account: string) { 
  return new RampInstantSDK({
  hostAppName: 'Raise',
  hostLogoUrl: 'https://picsum.photos/200/40',
  url: 'https://ri-widget-staging-ropsten.firebaseapp.com/',
  userAddress: account,
  fiatCurrency: "USD",
  fiatValue: "0.03",
});
}

export const Header: React.FC<HeaderProps> = ({ account, onLogin, onLogout }) => (
  <header>
    <div className="wrapper">
      <div>
        <svg width="25.4" height="25.4" viewBox="0 0 25.4 25.4" xmlns="http://www.w3.org/2000/svg">
          <g fill="#55CC55">
          <path d="M 18.173207,12.497328 C 14.499119,28.48611 0.41029466,24.565148 0.41029466,24.565148 2.4065117,20.335344 6.1091887,25.895781 10.850624,10.885154 L 4.6693567,9.5047871 16.872359,0.41029246 24.989733,14.014227 Z"/>
          </g>
        </svg>
        <h1>Raise</h1>
      </div>
      <div>
        {account ? (
          <>
            <Button size="small" onClick={() => buildRamp(account).show()} label="Get ETH" />
            <Button size="small" onClick={onLogout} label="Disconnect Wallet" />
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Connect Wallet" />
          </>
        )}
      </div>
    </div>
  </header>
);
