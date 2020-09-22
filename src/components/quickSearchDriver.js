import React from 'react';
import { Form, Input, Button } from 'antd';

function quickSearchDriver() {
  return (
    <div>
      <Form.Item label='Field A'>
        <Input placeholder='input placeholder' />
      </Form.Item>
      <Form.Item label='Field B'>
        <Input placeholder='input placeholder' />
      </Form.Item>
      <Form.Item>
        <Button type='primary'>Submit</Button>
      </Form.Item>
    </div>
  );
}

export default quickSearchDriver;
