import { Story, Meta } from '@storybook/react';

import { ProjPreviewProps, ProjPreview } from "./ProjPreview"

export default {
    title: 'Raise/ProjPreview',
    component: ProjPreview,
} as Meta;

const Template: Story<ProjPreviewProps> = (args) => <ProjPreview {...args} />;

export const Bike = Template.bind({});
Bike.args = {
    projprogressdata: {
        target: 2000,
        raised: 100,
        currencySymbol: " USD",
        symbolFirst: false
    },
    summary: "I want a new bike, gimme money pl0x",
    title: "New Bike"
} as ProjPreviewProps;

export const Car = Template.bind({});
Car.args = {
    projprogressdata: {
        target: 35000,
        raised: 0,
        currencySymbol: " USD",
        symbolFirst: false
    },
    summary: "car go zoom",
    title: "Car Purchase"
} as ProjPreviewProps;

export const Fail = Template.bind({});
Fail.args = {
    projprogressdata: {
        target: 3,
        raised: 0,
        currencySymbol: " USD",
        symbolFirst: false
    },
    summary: "Et expedita fugit qui. Sunt aliquam maiores et sed tempora. Quis harum dolor velit porro ratione. Qui voluptatem vel similique similique ullam. Veniam tempore accusamus velit eum vel quidem. A commodi hic dolorum et modi. Est cumque deserunt voluptas fugit voluptate ea omnis qui. Eaque voluptatem aliquid est maiores fugiat sit tempore nobis. Velit dolor ut labore placeat. Omnis voluptatem totam doloribus. Enim nam rerum enim ipsam. Quisquam exercitationem amet et iure incidunt neque cumque. Iusto dolorem quod ut quidem. Ex aut dolores tenetur. Molestias exercitationem iusto fugiat. Necessitatibus soluta in quia unde veritatis. Et aliquid necessitatibus ipsum harum maiores. Alias nihil facere vero. Consequatur incidunt reiciendis non.", 
    title: "Failing Campaign"
} as ProjPreviewProps;
