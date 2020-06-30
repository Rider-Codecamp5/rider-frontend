import React, { useState, useEffect } from 'react';
import axios from '../../configs/axios';
import { Form, Input, Row, Col, Button, Avatar } from 'antd';
import { Link, Redirect, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { UserOutlined } from '@ant-design/icons';
import '../../styles/UserRegisterRoute.css';
import '../../styles/LoginUser.css';
import * as storageItem from '../../configs/localStorageItems';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 5,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

function LoginUser(props) {
  const [LoginComplete, setLoginComplete] = useState(false);
  const [form] = Form.useForm();
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      const user = jwtDecode(localStorage.getItem('ACCESS_TOKEN'));
      setLoginComplete(true);
    }
  }, []);

  const onFinish = async values => {
    const body = {
      email: values.email,
      password: values.password,
    };

    try {
      const createUser = await axios.post('/user/loginUser', body);
      localStorage.setItem(storageItem.ACCESS_TOKEN, createUser.data.token);

      try {
        console.log('isDriver', createUser.data.isDriver);
        if (createUser.data.isDriver) {
          localStorage.setItem(storageItem.role, 'driver');
        } else {
          localStorage.setItem(storageItem.role, 'user');
        }
      } catch (err) {
        console.log(err);
      }

      props.setRole(localStorage.getItem(storageItem.role));
      alert('Welcome to Rider');
      form.resetFields();
      history.push('/search-driver');
    } catch (err) {
      console.log(err);
      form.resetFields();
      alert('login failed');
    }
  };

  return (
    <Col className='login'>
      <Row justify='center'>
        <Avatar size={80} icon={<UserOutlined />} />
      </Row>

      <Row justify='center'>
        <h1 className='App__header'>Welcome to Rider</h1>
      </Row>

      <Row justify='center'>
        <Col span={24}>
          <Form
            {...formItemLayout}
            form={form}
            name='login'
            onFinish={onFinish}
            initialValues={{
              residence: ['zhejiang', 'hangzhou', 'xihu'],
              prefix: '86',
            }}
            scrollToFirstError
          >
            <Row justify='center' align='middle'>
              <Col xs={24} md={15}>
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
                  <Input className='login__input' />
                </Form.Item>
              </Col>
            </Row>

            <Row justify='center'>
              <Col xs={24} md={15}>
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
                  <Input.Password className='login__input' />
                </Form.Item>
              </Col>
            </Row>

            <Row justify='center'>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='App__button'
                >
                  Login
                </Button>
              </Form.Item>
            </Row>

            <Row justify='center'>
              <Link to='/register'>Register</Link>{' '}
              <span style={{ padding: '0 0.5rem' }}>|</span>{' '}
              <Link to=''>Forget Password?</Link>
            </Row>
            {LoginComplete ? <Redirect to='/driver/route' /> : null}
          </Form>
        </Col>
      </Row>
    </Col>
  );
}

export default LoginUser;
