import React, { useEffect } from 'react';
import { Form, Input, Modal, DatePicker } from 'antd';
export function CollectionCreateForm({ open, onCreate, onCancel, data }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      code: (data && data.code) || '',
      validFrom: (data && data.validFrom) || '',
      validTo: (data && data.validTo) || '',
      upTo: (data && data.upTo) || '',
      discount: (data && data.discount) || '',
    });
  }, [data]);
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
          code: data && data.code,
          validFrom: data && data.validFrom,
          validTo: data && data.validTo,
          upTo: data && data.upTo,
          discount: data && data.discount,
        }}
      >
        <Form.Item name="code" label="Code" rules={[
          {
            required: true,
            message: 'Please input the voucher code!',
          },
        ]}>
          <Input dir="rtl" />
        </Form.Item>
        <Form.Item name="validFrom" label="Activation date" rules={[
          {
            required: true,
            message: 'Please input the activation date!',
          },
        ]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="validTo" label="Expiration date" rules={[
          {
            required: true,
            message: 'Please input the expiration date!',
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
          <Input dir="rtl" />
        </Form.Item>
        <Form.Item name="upTo" label="Up to" rules={[
          {
            required: true,
            message: 'Please input the maximum discount amount!',
          },
        ]}>
          <Input dir="rtl" />
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