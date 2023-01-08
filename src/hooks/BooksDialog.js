import React, { useEffect } from 'react';
import { Form, Input, Modal, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export function CollectionCreateForm({ open, onCreate, onCancel, data }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: (data && data.name) || '',
      imageUrl: data && data.imageUrl,
      CategoryModelId: data && data.CategoryBook.CategoryModelId,
      AuthorModelId: data && data.AuthorBook.AuthorModelId,
    });
  }, [data]);
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
          name: data && data.name,
          imageUrl: data && data.imageUrl,
          CategoryModelId: data && data.CategoryBook.CategoryModelId,
          AuthorModelId: data && data.AuthorBook.AuthorModelId,
        }}>
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
          <Input placeholder='Name' dir="rtl" />
        </Form.Item>
        <Form.Item name="AuthorModelId" label="Author ID" rules={[
          {
            required: true,
            message: 'Please input the author id!',
          },
        ]}>
          <Input placeholder='Author ID' />
        </Form.Item>
        <Form.List name="AuthorBook">
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
                    name={[name, 'AuthorModelId']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing Author ID',
                      },
                    ]}
                  >
                    <Input placeholder="Author ID" dir="rtl" />
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
        <Form.Item name="CategoryModelId" label="Category ID" rules={[
          {
            required: true,
            message: 'Please input the category!',
          },
        ]}>
          <Input placeholder='Category ID' />
        </Form.Item>
        <Form.List name="CategoryBook">
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
                    name={[name, 'CategoryModelId']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing category ID',
                      },
                    ]}
                  >
                    <Input placeholder="Category ID" dir="rtl" />
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
        <Form.Item name="imageUrl" label="Book image URL" rules={[
          {
            required: true,
            message: 'Please input the url!',
          },
        ]}>
          <Input placeholder='URL' dir="rtl" />
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

