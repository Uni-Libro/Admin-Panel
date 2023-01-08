import React, { useEffect } from "react";
import { Form, Input, InputNumber, Modal, DatePicker, Typography } from "antd";
import dayjs from "dayjs";
import { timeFormatter } from "../utils/time-format";

export function CollectionCreateForm({ open, onCreate, onCancel, data }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      code: (data && data.code) || "",
      validFrom: dayjs(data && data.validFrom) || "",
      validTo: dayjs(data && data.validTo) || "",
      upTo: (data && data.upTo) || "",
      discount: (data && data.discount) || "",
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
          code: data && data.code,
          validFrom: data && data.validFrom,
          validTo: data && data.validTo,
          upTo: data && data.upTo,
          discount: data && data.discount,
        }}
      >
        <Form.Item
          name="code"
          label="Code"
          rules={[
            {
              required: true,
              message: "Please input the voucher code!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="validFrom"
          label="Activation date"
          rules={[
            {
              required: true,
              message: "Please input the activation date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="validTo"
          label="Expiration date"
          rules={[
            {
              required: true,
              message: "Please input the expiration date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="discount"
          label="Discount"
          rules={[
            {
              required: true,
              message: "Please input the discount percentage!",
            },
          ]}
        >
          <InputNumber
            defaultValue={100}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
          />
        </Form.Item>
        <Form.Item
          name="upTo"
          label="Up to"
          rules={[
            {
              required: true,
              message: "Please input the maximum discount amount!",
            },
          ]}
        >
          <InputNumber
            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\s?|(,*)/g, "")}
            step={1000}
            addonAfter="Toman"
          />
        </Form.Item>
        <Typography>
          Active From:{" "}
          {form.getFieldValue("validFrom") &&
            timeFormatter(form.getFieldValue("validFrom").toDate())}
        </Typography>
        <Typography>
          Active To:{" "}
          {form.getFieldValue("validTo") &&
            timeFormatter(form.getFieldValue("validTo").toDate())}
        </Typography>
      </Form>
    </Modal>
  );
}

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
}
