import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ExplorePage, ExplorePageProps } from './ExplorePage';
import * as HeaderStories from './Header.stories';
import * as ProjPreviewStories from './ProjPreview.stories';
import { ProjPreviewProps } from './ProjPreview';

export default {
  title: 'Raise/ExplorePage',
  component: ExplorePage,
} as Meta;

const Template: Story<ExplorePageProps> = (args) => <ExplorePage {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
  campaigns: []
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
  campaigns: []
};