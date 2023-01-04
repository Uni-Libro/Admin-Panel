import React from 'react';
import { Form, Input, Modal, DatePicker, InputNumber } from 'antd';
export function CollectionCreateForm({ open, onCreate, onCancel }) {
  const [form] = Form.useForm();
  const onChange = (value) => {
    console.log('changed', value);
  };
  return (
    <Modal
      open={open}
      title="Voucher"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="id"
          label="ID"
          rules={[
            {
              required: true,
              message: 'Please input the voucher ID!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="code" label="Code" rules={[
          {
            required: true,
            message: 'Please input the voucher code!',
          },
        ]}>
          <Input />
        </Form.Item>
        <Form.Item name="aDate" label="Activation date" rules={[
          {
            required: true,
            message: 'Please input the categories!',
          },
        ]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="eDate" label="Expiration date" rules={[
          {
            required: true,
            message: 'Please input the categories!',
          },
        ]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="discount" label="Discount" rules={[
          {
            required: true,
            message: 'Please input the discount percentage!',
          },
        ]}>
          <InputNumber
            defaultValue={20}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace('%', '')}
            onChange={onChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};