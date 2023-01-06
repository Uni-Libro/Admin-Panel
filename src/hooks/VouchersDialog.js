import React, { useEffect } from 'react';
import { Form, Input, Modal, DatePicker, InputNumber } from 'antd';
export function CollectionCreateForm({ open, onCreate, onCancel, data }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      id: (data && data.id) || '',
      code: (data && data.code) || '',
      aDate: (data && data.aDate) || '',
      eDate: (data && data.eDate) || '',
      discount: (data && data.discount) || '',
    });
  }, [data]);
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
          id: data && data.id,
          code: data && data.code,
          aDate: data && data.aDate,
          eDate: data && data.eDate,
          discount: data && data.discount,
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
          <Input dir="rtl" />
        </Form.Item>
        <Form.Item name="code" label="Code" rules={[
          {
            required: true,
            message: 'Please input the voucher code!',
          },
        ]}>
          <Input dir="rtl" />
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

export function DeleteModal({ open, onDelete, onCancel }) {
  return (
    <Modal
      open={open}
      //warning icon
      title="⚠️ Delete"
      okText="Delete"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onDelete();
      }}
    >
      <p>Are you sure you want to delete this?</p>
    </Modal>
  );
};