import React from 'react';
import { Form, Input, Modal, } from 'antd';
export function CollectionCreateForm({ open, onCreate, onCancel }) {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Author"
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
          name="name"
          label="Author name"
          rules={[
            {
              required: true,
              message: 'Please input the author name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="pictureUrl" label="Author picture URL" rules={[
          {
            required: true,
            message: 'Please input the url!',
          },
        ]}>
          <Input placeholder='URL' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export function DeleteModal({ open, onDelete, onCancel }) {
  return (
    <Modal
      open={open}
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