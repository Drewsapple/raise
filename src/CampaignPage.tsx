import { useContractFunction, useEthers } from '@usedapp/core';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { Contract } from '@ethersproject/contracts'
import { Interface } from '@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface';
import { utils } from 'ethers'
import {abi} from "./truffleenv/build/contracts/Campaign.json"

const { Option } = Select;

export const CampaignPage: React.FC<{match: any}> = ({match}) => {
    const { params: {address} } = match;

    const [form] = Form.useForm();
    const { account, library } = useEthers();

    const signer = library!.getSigner()
    const contract = new Contract(
        address,
        new Interface(abi)
    )

    contract.connect(signer!);

    const {state, send} = useContractFunction(contract, "deposit", {})

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    function callDonate() {
        
        if(account && signer) {
            console.log(`Contributing: ${form.getFieldValue("amount")}`)

            send({refundee: account});
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