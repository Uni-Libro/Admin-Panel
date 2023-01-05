import React from 'react';
import { Form, Input, Modal, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export function CollectionCreateForm({ open, onCreate, onCancel }) {
  const [form] = Form.useForm();
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
      <Form form={form}
        layout="vertical" name="dynamic_form_nest_item" initialValues={{
          modifier: 'public',
        }} autoComplete="off">
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
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item name="authorId" label="Author ID" rules={[
          {
            required: true,
            message: 'Please input the authors id!',
          },
        ]}>
          <Input placeholder='Author ID' />
        </Form.Item>
        <Form.List name="authorsId">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...Field }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 5,
                  }}
                  align="baseline"
                  size="large"
                >
                  <Form.Item
                    {...Field}
                    name={[name, 'authorId']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing Author ID',
                      },
                    ]}
                  >
                    <Input placeholder="Author ID" />
                  </Form.Item>
                  <MinusCircleOutlined style={{ fontSize: '16px' }} onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button onClick={() => add()} block icon={<PlusOutlined />}>
                  Add author ID
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item name="categorieId" label="Category ID" rules={[
          {
            required: true,
            message: 'Please input the categories!',
          },
        ]}>
          <Input placeholder='Category ID' />
        </Form.Item>
        <Form.List name="categoriesId">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...Field }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 5,
                  }}
                  align="baseline"
                  size="large"
                >
                  <Form.Item
                    {...Field}
                    name={[name, 'categoryId']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing category ID',
                      },
                    ]}
                  >
                    <Input placeholder="Category ID" />
                  </Form.Item>
                  <MinusCircleOutlined style={{ fontSize: '16px' }} onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button onClick={() => add()} block icon={<PlusOutlined />}>
                  Add category ID
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item name="pictureUrl" label="Book picture URL" rules={[
          {
            required: true,
            message: 'Please input the url!',
          },
        ]}>
          <Input placeholder='URL' />
        </Form.Item>
        <Form.Item name="pdfUrl" label="Book PDF URL" rules={[
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

