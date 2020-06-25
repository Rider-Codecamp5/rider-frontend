import React, { useState, useEffect } from 'react';
import axios from '../../configs/axios';
import { Form, Input, Select, Row, Col, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../../styles/UserRegisterRoute.css';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Navbar from '../Navbar';
import jwtDecode from 'jwt-decode'


const { Option } = Select;
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

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function LoginUser(props) {

  const { isLogin, setIsLogin, userInfo, setUserInfo } = props;
  const [LoginComplete, setLoginComplete] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      const user = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))
      setIsLogin(true)
      setUserInfo(user)
      setLoginComplete(true)
    }
  }, [])


  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    console.log(values.email)
    console.log(values.password)
    const body = {
      email: values.email,
      password: values.password,
    }

    try {
      const createUser = await axios.post('/user/loginUser', body);
      localStorage.setItem('ACCESS_TOKEN', createUser.data.token);
      console.log(`${localStorage.getItem('ACCESS_TOKEN')}`)
      console.log('OK')
      alert('Welcome to Rider')
      setLoginComplete(true)
      form.resetFields()
      history.push('/search-driver');
    } catch (err) {
      console.log('fail')
      console.log(err)
      form.resetFields()
      alert('login failed')
    }
  };



  return (
    <div>
      <Navbar />

      <Row justify='center' style={{ paddingTop: '50px', paddingBottom: '10px' }}>
        <Col xs={4} sm={2}>
          <Avatar size={80} icon={<UserOutlined />} />
        </Col>
      </Row>
      <Row justify='center'>
        <Col xs={8} sm={4} md={4} lg={3}>
          <h1 className='h1'>Welcome to Rider</h1>
        </Col>
      </Row>

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
        <Row justify='center'>
          <Col xs={20} sm={22}>
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
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify='center'>
          <Col xs={20} sm={22}>
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
              <Input.Password />
            </Form.Item>

          </Col>
        </Row>

        <Row justify='center'>
          <Col span={4}>
            <Form.Item
              {...tailFormItemLayout}
            >
              <Button
                type='primary'
                htmlType='submit'
                style={{ backgroundColor: '#40CE5D', borderRadius: 'none', marginBottom: '50px' }}
              >
                Login
        </Button>
            </Form.Item>
          </Col>
        </Row>

        <Row justify='center'>
          <Col xs={12} sm={6}>
            <Link to='/register'>Register</Link> | <Link to=''>Forget Password?</Link>
          </Col>

        </Row>

        {LoginComplete ? <Redirect to='/driver/route' /> : null}
      </Form>

    </div >
  )
}

export default LoginUser;
