import React from 'react';
import { Form, Input, Modal, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
export function CollectionCreateForm({ open, onCreate, onCancel }) {
  const [form] = Form.useForm();
  const props = {
    name: 'file',
    action: '/',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Modal
      open={open}
      title="Book"
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
          label="Book name"
          rules={[
            {
              required: true,
              message: 'Please input the book name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="authors" label="Authors" rules={[
          {
            required: true,
            message: 'Please input the authors names!',
          },
        ]}>
          <Input />
        </Form.Item>
        <Form.Item name="categories" label="Categories" rules={[
          {
            required: true,
            message: 'Please input the categories!',
          },
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Book picture" valuePropName="fileList">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="PDF" valuePropName="fileList" rules={[
          {
            required: true,
            message: 'Please input the PDF!',
          },
        ]}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};