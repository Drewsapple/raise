import { useContractFunction, useEthers } from '@usedapp/core';
import { Form, Input, Button, InputNumber } from 'antd';
import { Contract } from '@ethersproject/contracts'
import { Interface } from '@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface';
import {abi} from "./truffleenv/build/contracts/Raise.json"
import { useMutation } from 'urql';
import { useEffect } from 'react';


export const Create: React.FC = () => {
    const [form] = Form.useForm();
    const { account } = useEthers();

    const launchCampaign = `
    mutation LaunchCampaign($data: CampaignInput!){
    createCampaign(data: $data) {
        title
        endTime
        target
    }}`;

    const [result, createCampaign] = useMutation(launchCampaign);

    const contract = new Contract(
        '0x77F4ee5aAf73E149827d67Da3D27031a8258698C',
        new Interface(abi)
    )

    const {state, send} = useContractFunction(contract, "createCampaign", {})

    useEffect(() => {
        if(state.status == "Success"){
            publishCampaign(state.receipt!.logs[1].topics[0])
        }
    },[state])

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    function callCreate() {
        if(account) {
            send(form.getFieldValue("title")).then(
            () => console.log(state)
            )
        }
    }

    function publishCampaign(campaignAddress: string) {
        console.log(`New campaign published to addr: ${campaignAddress}`)
        createCampaign({data: {
            title: form.getFieldValue("title"),
            description: form.getFieldValue("description"),
            endTime: 1500000,
            target: form.getFieldValue("target"),
            contract: campaignAddress,
            currencySymbol: " ETH",
            symbolFirst: false
        }}).then(console.log)
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={callCreate}>
            <Form.Item name="title" label="Campaign Title" rules={[{ required: true, whitespace: true}]}>
                <Input autoComplete="off"/>
            </Form.Item>
            <Form.Item name="target" label="Fundraising Target" rules={[{ required: true }]}>
                <InputNumber min={0}/>
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: false }]}>
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" >
                Submit
            </Button>
            </Form.Item>
        </Form> 
    )
}