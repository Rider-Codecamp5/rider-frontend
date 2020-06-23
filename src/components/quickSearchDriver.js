import React from "react";
import { DatePicker } from 'antd';
import { Form, Input, Button, Radio } from 'antd';

function quickSearchDriver() {
  return (
    <div>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </div>
  )
}

export default quickSearchDriver;
