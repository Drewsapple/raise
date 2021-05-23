import React from 'react';

import { Progress, Statistic } from 'antd';


export interface ProjProgressProps {
    target: number,
    raised: number,
    endDate?: number,
}

export const ProjProgress: React.FC<ProjProgressProps> = ({target, raised, endDate}) => (
    <div>
        <Statistic title="Funds raised" value={raised + " / " + target} />
        <Progress strokeLinecap="square" percent={raised/target*100} />
        
    </div>
);