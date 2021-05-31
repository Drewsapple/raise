import { useContractFunction, useEthers } from '@usedapp/core';
import {utils} from 'ethers'
import { Form, Input, Button, InputNumber, DatePicker, Typography, Card, notification } from 'antd';
import { Contract } from '@ethersproject/contracts'
import { Interface } from '@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface';
import {abi} from "./truffleenv/build/contracts/Raise.json"
import { useMutation } from 'urql';
import { useEffect, useRef } from 'react';

const {parseEther} = utils;


export const Create: React.FC = () => {
    const [form] = Form.useForm();
    const { account } = useEthers();
    const campaignInfo = useRef({data: {
        contract: "",
        title: "",
        description: "",
        currencySymbol: " ETH",
        symbolFirst: false
    }});

    const launchCampaign = `
    mutation LaunchCampaign($data: CampaignInput!){
    createCampaign(data: $data) {
        title
        contract
    }}`;

    const [, createCampaign] = useMutation(launchCampaign);
    

    const contract = new Contract(
        '0xc1ea212c8ee6389df6d0d1793fa195b8e72aae92',
        new Interface(abi)
    )

    const {state, send} = useContractFunction(contract, "createCampaign", {})

    useEffect(() => {
        if(state.status === "Success"){
            campaignInfo.current.data.contract = contract.interface.decodeEventLog("CampaignLaunched", state.receipt!.logs[1].data)[0]
            createCampaign(campaignInfo.current).then(console.log)
            notification.success({
                message: "Transaction Mined",
                description: "Your campaign has been launched!",
            })
        }
        else if(state.status === "Mining") {
            notification.info({
                message: "Transaction Sent",
                description: "Please wait for the transaction to complete before moving on from this page",
                duration: 15
            })
        }
    // Disable warning here to use contract.interface without calling dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            send(parseEther(form.getFieldValue("target").toString()), form.getFieldValue("endtime").unix())
            campaignInfo.current.data.description = form.getFieldValue("description")
            campaignInfo.current.data.title = form.getFieldValue("title")
        }
    }

    return (
        <Card>
        <Typography.Title style={{width: "100%", textAlign: "center"}} > Create a Campaign</Typography.Title>
        <Form {...layout} form={form} name="control-hooks" onFinish={callCreate}>
            <Form.Item name="title" label="Campaign Title" rules={[{ required: true, whitespace: true}]}>
                <Input autoComplete="off"/>
            </Form.Item>
            <Form.Item name="target" label="Fundraising Target" rules={[{ required: true }]}>
                <InputNumber min={0} placeholder="in ETH" style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: false }]}>
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 12 }} />
            </Form.Item>
            <Form.Item name="endtime" label="End Time" rules={[{required: true}]}>
                <DatePicker showTime />
            </Form.Item>
            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" >
                Submit
            </Button>
            </Form.Item>
        </Form> 
        </Card>
    )
}