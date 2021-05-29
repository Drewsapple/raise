import { useContractFunction, useEthers } from '@usedapp/core';
import { Form, Button, InputNumber } from 'antd';
import { Contract } from '@ethersproject/contracts';
import { Interface } from '@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface';
import {abi} from "./truffleenv/build/contracts/Raise.json";

export const CampaignPage: React.FC<{match: any}> = ({match}) => {
    const { params: {address} } = match;

    const [form] = Form.useForm();
    const { account, library } = useEthers();

    const contract = new Contract(
        '0x1DDfF3071C45a2cb440b4D4Dcd1434eF9b0cC51A',
        new Interface(abi)
    )

    const { /*state,*/ send} = useContractFunction(contract, "depositToCampaign", {})


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    function callDonate() {
        if(account && library) {
            const signer = library.getSigner()
            
            contract.connect(signer);
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