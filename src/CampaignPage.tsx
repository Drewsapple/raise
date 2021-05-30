import { useContractFunction, useEthers } from '@usedapp/core';
import { Form, Button, InputNumber } from 'antd';
import { Contract } from '@ethersproject/contracts';
import { Interface } from '@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface';
import {abi} from "./truffleenv/build/contracts/Raise.json";
import { useEffect } from 'react';

export interface CampaignData {
    contract: string,
    title: string,
    target: number,
    description?: string,
    endDate?: number,
    currencySymbol: string,
    symbolFirst: boolean,
}

export const CampaignPage: React.FC<{match: any}> = ({match}) => {
    const { params: {address} } = match;

    const [form] = Form.useForm();
    const { account } = useEthers();

    const contract = new Contract(
        '0x77F4ee5aAf73E149827d67Da3D27031a8258698C',
        new Interface(abi)
    )

    const {state, send} = useContractFunction(contract, "depositToCampaign", {})

    useEffect(() => {
        console.log(state)
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
            console.log(`Contributing: ${form.getFieldValue("amount")}`)

            send(address, account, {value: form.getFieldValue("amount")});
        }

    }

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={callDonate}>
            <Form.Item name="amount" label="Contribution Amount" rules={[{ required: true}]}>
                <InputNumber min={0}/>
            </Form.Item>
            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" >
                Submit
            </Button>
            </Form.Item>
        </Form> 
    )
}