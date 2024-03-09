import { Form, Input, Checkbox, Button, Cascader } from 'antd';
import dataitem from "../../data/item2.json";
import axios from "axios";
import area from "../../data/CityCountyDataAAA.json";
import Prconly2 from '../upimg'

import "./up.scss";

const Up = () => {
 
  // const onFinish = (values) => {
  //   console.log(values);
  // };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/mypro', values); // Sending the form data to the backend
      console.log(response.data); // Assuming the backend returns some data
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (value) => {
    console.log(value);
  };

  return (
    <Form
      name="productForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      id='fastout'
    >
      <Form.Item
        label="商品名稱"
        name="productName"
        rules={[{ required: true, message: '輸入商品名稱' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="租金(/天)"
        name="rentPerDay"
        rules={[{ required: true, message: '輸入租金' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="押金"
        name="deposit"
        rules={[{ required: true, message: '輸入押金' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item label="照片" name="fileList" valuePropName="fileList">
      <Prconly2 />
      </Form.Item>

      <Form.Item
        label="商品分類"
        name="category"
        rules={[{ required: true, message: '請選擇商品分類' }]}
      >
        <Cascader
          options={dataitem}
          onChange={onChange}
          placeholder="請選擇商品分類"
          fieldNames={{ children: "subOptions", value: "value", label: "label" }}
        />
      </Form.Item>

      <Form.Item
        label="地區"
        name="region"
        rules={[{ required: true, message: '請選擇地區' }]}
      >
        <Cascader
          options={area}
          onChange={onChange}
          placeholder="請選擇地區"
          fieldNames={{ children: "AreaList", label: "Name", value: "Name" }}
        />
      </Form.Item>

      <Form.Item
        label="商品描述"
        name="description"
        rules={[{ required: true, message: '請輸入商品描述' }]}
      >
        <Input.TextArea
          maxLength={300}
          placeholder="請輸入商品描述，限300字內"
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        wrapperCol={{ offset: 6, span: 14 }}
      >
        <Checkbox>
          我同意注意事項
        </Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Up;
