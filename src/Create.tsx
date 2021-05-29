import { useContractFunction, useEthers } from '@usedapp/core';
import { Form, Input, Button, InputNumber } from 'antd';
import { Contract } from '@ethersproject/contracts'
import { Interface } from '@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface';
import {abi} from "./truffleenv/build/contracts/Raise.json"

export const Create: React.FC = () => {
    const [form] = Form.useForm();
    const { account, library } = useEthers();


    const signer = library?.getSigner()
    const contract = new Contract(
        '0x1DDfF3071C45a2cb440b4D4Dcd1434eF9b0cC51A',
        new Interface(abi)
    )

    contract.connect(signer!);

    const {/*state,*/ send} = useContractFunction(contract, "createCampaign", {})

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    function callCreate() {
        console.log(form.getFieldValue("title"))

        if(account && signer) {
            send(form.getFieldValue("title"))
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