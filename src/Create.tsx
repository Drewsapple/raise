import { useContractFunction, useEthers } from '@usedapp/core';
import { Form, Input, Button, InputNumber } from 'antd';
import { Contract } from '@ethersproject/contracts'
import { Interface } from '@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface';
import {abi} from "./truffleenv/build/contracts/Raise.json"
import { useMutation } from 'urql';
import { useEffect, useRef } from 'react';


export const Create: React.FC = () => {
    const [form] = Form.useForm();
    const { account } = useEthers();
    const campaignInfo = useRef({data: {
        contract: "",
        title: "",
        description: "",
        target: 0,
        endTime: 1500000,
        currencySymbol: " ETH",
        symbolFirst: false
    }});

    const launchCampaign = `
    mutation LaunchCampaign($data: CampaignInput!){
    createCampaign(data: $data) {
        title
        endTime
        target
    }}`;

    const [, createCampaign] = useMutation(launchCampaign);
    

    const contract = new Contract(
        '0x77F4ee5aAf73E149827d67Da3D27031a8258698C',
        new Interface(abi)
    )

    const {state, send} = useContractFunction(contract, "createCampaign", {})

    useEffect(() => {
        if(state.status === "Success"){
            campaignInfo.current.data.contract = state.receipt!.logs[1].topics[0]
            createCampaign(campaignInfo)
        }
    },[state, createCampaign])

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    function callCreate() {
        if(account) {
            send(form.getFieldValue("title"))
            campaignInfo.current.data.description = form.getFieldValue("description")
            campaignInfo.current.data.title = form.getFieldValue("title")
            campaignInfo.current.data.target = form.getFieldValue("target")
        }
    }
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