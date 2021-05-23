import React from 'react';
import { Story, Meta } from '@storybook/react';

import {ProjProgress, ProjProgressProps} from "./ProjProgress"

export default {
    title: 'Raise/ProjProgress',
    component: ProjProgress,
} as Meta;

const Template: Story<ProjProgressProps> = (args) => <ProjProgress {...args} />;

export const NoMoney = Template.bind({});
NoMoney.args = {
    target: 100,
    raised: 0,
}

export const SomeMoney = Template.bind({});
SomeMoney.args = {
    target: 100000,
    raised: 69420,
}