import React, { useEffect } from "react";
import { Form, Input, Modal } from "antd";
export function CollectionCreateForm({ open, onCreate, onCancel, data }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: (data && data.name) || "",
      imageUrl: data && data.imageUrl,
      description: (data && data.description) || "",
    });
  }, [data]);

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
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
          name: data && data.name,
          imageUrl: data && data.imageUrl,
          description: data && data.description,
        }}
      >
        <Form.Item
          name="name"
          label="Author name"
          rules={[
            {
              required: true,
              message: "Please input the author name!",
            },
          ]}
        >
          <Input dir="rtl" />
        </Form.Item>
        <Form.Item
          name="imageUrl"
          label="Author picture URL"
          rules={[
            {
              required: true,
              message: "Please input the url!",
            },
          ]}
        >
          <Input placeholder="URL" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Author Description"
          rules={[
            {
              required: false,
              message: "Please input the description",
            },
          ]}
        >
          <Input.TextArea placeholder="description" dir="rtl" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

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
}
