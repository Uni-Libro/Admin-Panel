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
        <Form.Item label="Author picture" valuePropName="fileList">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};