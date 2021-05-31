import { useContractCall, useContractFunction, useEthers } from '@usedapp/core';
import { Form, Button, InputNumber, Row, Col, Typography, Space, Divider, notification, Tooltip } from 'antd';
import { Contract } from '@ethersproject/contracts'
import { Interface } from '@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface';
import { abi as RaiseABI } from "./truffleenv/build/contracts/Raise.json"
import { abi as CampaignABI } from "./truffleenv/build/contracts/Campaign.json"
import { useEffect } from 'react';
import { ProjProgress } from './stories/ProjProgress';
import { useParams } from 'react-router-dom';
import {utils} from 'ethers'
import moment from 'moment';

const {parseEther} = utils;

export interface CampaignData {
    contract: string,
    title: string,
    description?: string,
    currencySymbol: string,
    symbolFirst: boolean,
}

export interface OnchainCampaignData extends CampaignData {
    target: number,
    raised: number,
    endDate: number,
    myContribution: number
}

export const CampaignPage: React.FC<{campaigns: CampaignData[]}> = ({campaigns}) => {
    const { address } = useParams<{address: string}>();

    const [form] = Form.useForm();
    const { account } = useEthers();

    const campaignIface = new Interface(CampaignABI);
    const raiseIface = new Interface(RaiseABI);
    const raiseContract = new Contract(
        '0xc1ea212c8ee6389df6d0d1793fa195b8e72aae92',
        raiseIface
    )
    const {state, send} = useContractFunction(raiseContract, "depositToCampaign", {})

    useEffect(() => {
        if(state.status === "Mining") {
            notification.info({
                message: "Transaction Sent",
                description: "Please wait for the transaction to complete before moving on from this page",
                duration: 15
            })
        }
        else if(state.status === "Success") {
            notification.success({
                message: "Transaction Mined",
                description: "Your donation has been recieved. Thanks!",
            })
        }
    },[state]);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    function callDonate() {
        if(account) {
            console.log(`Contributing: ${form.getFieldValue("amount")} to ${address}`)
            send(address, account, {value: parseEther(form.getFieldValue("amount").toString()), gasLimit: 150000});
        }

    }

    const {title, description, symbolFirst, currencySymbol} = campaigns.find((campaign: CampaignData) => campaign.contract === address) || {title: "Loading...", description: "Loading..."}
    const contractData = useContractCall({abi: campaignIface, address: address, method: "getStats", args: []});
    const [target, raised, endDate] = contractData ? contractData : [0, 0, 0]

    const finalize = useContractFunction(raiseContract, "finalizeCampaign");

    const refund = useContractFunction(raiseContract, "claimRefund");


    useEffect(() => {
        if(finalize.state.status === "Mining") {
            notification.info({
                message: "Transaction Sent",
                description: "Please wait for the transaction to complete before moving on from this page",
                duration: 15
            })
        }
        else if(finalize.state.status === "Success") {
            notification.success({
                message: "Transaction Mined",
                description: "The campaign has been finalized.",
            })
        }
    }, [finalize.state])

    useEffect(() => {
        if(refund.state.status === "Mining") {
            notification.info({
                message: "Transaction Sent",
                description: "Please wait for the transaction to complete before moving on from this page",
                duration: 15
            })
        }
        else if(refund.state.status === "Success") {
            notification.success({
                message: "Transaction Mined",
                description: "Your refund has been issued successfully.",
            })
        }
    }, [refund.state])

    return (
        <Row>
            <Col sm={24} md={16}>
                <Space size="large" direction="vertical" style={{width: "85%", display: "block", marginLeft: "auto", marginRight: "auto"}} >
                <Typography.Title level={1} style={{textAlign: "center", width: "100%"}}>{title}</Typography.Title>
                <Divider />
                <ProjProgress {...{target, raised, endDate, symbolFirst, currencySymbol} as OnchainCampaignData} />
                <Divider />
                <Typography.Title level={3}>About this Campaign</Typography.Title>
                <Typography.Paragraph ellipsis={{rows: 3}} >
                    {description ? description : "No description provided."}
                </Typography.Paragraph>
                </Space>
            </Col>
            <Col md={8}>
                { (endDate - moment().unix() > 0) && <>
                <Typography.Title style={{textAlign: "center", width: "100%"}} level={3}>Make a Contribution</Typography.Title>
                <Form {...layout} form={form} name="control-hooks" onFinish={callDonate}>
                    <Form.Item name="amount" label="Contribution Amount" rules={[{ required: true}]}>
                        <InputNumber placeholder="in ETH" min={0} style={{width: "75%", textAlign: "left"}}/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
                </> }
                { (endDate - moment().unix() <= 0) && <>
                    <Button onClick={() => {
                        finalize.send(address)
                    }}>Finalize Campaign</Button>
                    <Tooltip title="Only available for unsuccessful, finalized campaigns.">
                    <Button  onClick={() => {
                        refund.send(address, account)
                    }}>Refund</Button>
                    </Tooltip>
                </>}
            </Col>
        </Row>
    )
}