import React, { useState } from 'react';
import axios from '../../configs/axios';
import {
  Form,
  Input,
  Tooltip,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Avatar,
  Upload,
  message,
} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import '../../styles/UserRegisterRoute.css';
import { Link, Redirect } from 'react-router-dom';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 7,
    },
    lg: {
      span: 7,
    }, 
    xl: {
      span: 6,
    },
    xxl: {
      span: 4,
    }
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};

// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

function UserRegisterRoute() {
  const [registerFinish, setRegisterFinish] = useState(false);

  const [form] = Form.useForm();
  const [profile_pic, setProfilePic] = useState('');

  const onFinish = async values => {
    const body = {
      email: values.email,
      password: values.password,
      profile_pic,
      first_name: values.name,
      last_name: values.surname,
      address: values.address,
      phone_number: values.phone_number,
    };

    try {
      await axios.post('/user/createUser', body);
      console.log('OK');
      alert('User created');
      form.resetFields();
      setRegisterFinish(true);
    } catch (err) {
      console.log('fail');
      console.log(err);
      form.resetFields();
      alert('Invalid email');
    }
  };

  const imageUploadProps = {
    name: 'file',
    action: 'https://api.cloudinary.com/v1_1/xeusteerapat/image/upload',
    data: file => {
      return { upload_preset: 'sickfits' };
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file.response.secure_url, info.fileList);
      }
      if (info.file.status === 'done') {
        setProfilePic(info.file.response.secure_url);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div className='App__heading'>
        <h2>Register</h2>
      </div>
      <Col span={24} className='register'>
        <Row
          justify='center'
        >
          {/* <Col xs={4} sm={2}> */}
            <Avatar size={60} icon={<UserOutlined />} />
          {/* </Col> */}
        </Row>
        <Row justify='center'>
          {/* <Col xs={8} sm={4} md={4} lg={3}> */}
            <h1 className='App__header'>Create Account</h1>
          {/* </Col> */}
        </Row>
      
        <Form
          {...formItemLayout}
          form={form}
          name='register'
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        >
          <Row justify='center'>
            <Col xs={20} sm={22} md={18} lg={14} >
              <Form.Item
                name='email'
                label='E-mail'
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input className='register__input' />
              </Form.Item>
            </Col>
          </Row>
          <Row justify='center'>
            <Col xs={20} sm={22} md={18} lg={14}>
              <Form.Item
                name='password'
                label='Password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password className='register__input' />
              </Form.Item>
            </Col>
          </Row>
          <Row justify='center'>
            <Col xs={20} sm={22} md={18} lg={14}>
              <Form.Item
                name='confirm'
                label='Confirm Password'
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        'The two passwords that you entered do not match!'
                      );
                    },
                  }),
                ]}
              >
                <Input.Password className='register__input' />
              </Form.Item>
            </Col>
          </Row>

          <Row justify='center'>
            <Col xs={20} sm={22} md={18} lg={14}>
              <Form.Item
                name='name'
                label={
                  <span>
                    Name&nbsp;
                    <Tooltip title='Please Enter Your Name'></Tooltip>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Name',
                    whitespace: true,
                  },
                ]}
              >
                <Input className='register__input' />
              </Form.Item>
            </Col>
          </Row>

          <Row justify='center'>
            <Col xs={20} sm={22} md={18} lg={14}>
              <Form.Item
                name='surname'
                label={
                  <span>
                    Surname&nbsp;
                    <Tooltip title='Please Enter Your Surname'></Tooltip>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Surname',
                    whitespace: true,
                  },
                ]}
              >
                <Input className='register__input' />
              </Form.Item>
            </Col>
          </Row>

          <Row justify='center'>
            <Col xs={20} sm={22} md={18} lg={14}>
              <Form.Item
                name='phone_number'
                label={
                  <span>
                    Phone number&nbsp;
                    <Tooltip title='Please Enter Your Phone number'></Tooltip>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Phone number',
                    whitespace: true,
                  },
                ]}
              >
                <Input className='register__input' />
              </Form.Item>
            </Col>
          </Row>

          <Row justify='center'>
            <Col xs={20} sm={22} md={18} lg={14}>
              <Form.Item
                name='address'
                label={
                  <span>
                    Address&nbsp;
                    <Tooltip title='Please Enter Your Address'></Tooltip>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Address',
                    whitespace: true,
                  },
                ]}
              >
                <Input className='register__input' />
              </Form.Item>
            </Col>
          </Row>

          <Row justify='center'>
            {/* <Col xs={20} sm={22}> */}
              <Upload {...imageUploadProps}>
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            {/* </Col> */}
          </Row>

          <Row justify='center' >
            <Col span={24} style={{textAlign: 'center'}}>
              <Form.Item
                name='agreement'
                valuePropName='checked'
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject('Should accept agreement'),
                  },
                ]}
                // {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <Link to='/PrivacyPolicy' style={{display: 'inline'}}>agreement</Link>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row justify='center'>
            <Col>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='App__button'
                >
                  Create Account
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Row justify='center' style={{ marginBottom: '50px' }}>
            {/* <Col xs={12} sm={6} > */}
              <Link to='/'>Login</Link><span style={{padding: '0 0.5rem'}}>|</span><Link to=''>Forget Password?</Link>
            {/* </Col> */}
          </Row>
        </Form>
      </Col>
      {registerFinish ? <Redirect to='/' /> : null}
    </div>
  );
}

export default UserRegisterRoute;
