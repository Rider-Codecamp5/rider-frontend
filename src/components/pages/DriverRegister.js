import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../configs/axios';
import { Space, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Avatar, } from 'antd';
import { InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Navbar';


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

function DriverRegister() {
  const [registerFinish, setRegisterFinish] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN"));
      setIsLogin(true);
      setUserInfo(user);
    }
  }, [])


  useEffect(() => {
    checkRegister();
  }, [])

  const checkRegister = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}` };
    const driver = await axios.get(`/driver/registered/${userInfo.id}`, { headers: headers });
    try {
      setRegisterFinish(true)
    } catch (error) {

    }
    // console.log(driver)
    // if(driver){
    //     // console.log("already register")
    //     alert("already register")
    // }else{
    //     // console.log("OK")
    //     alert("OK")
    // }
  }



  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    const body = {
      id: userInfo.id,
      driver_license: values.driver_license,
      seat: values.seat,
      car_model: values.car_model,
      car_color: values.car_color,
      bank_account: values.bank_account,
    }
    // console.log({body: body})
    const headers = { Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}` }
    // console.log({headers: headers})
    const createUser = await axios.post(`/driver/register`, body, { headers: headers });
    try {
      // const createUser = await axios.post(`/driver/register`,body,{headers: headers});
      console.log("OK")
      alert("User created")
      form.resetFields()
      setRegisterFinish(true)
    } catch (err) {
      console.log("fail")
      console.log(err)
      form.resetFields()
      alert("Invalid email")
    }
  };

  return (
    <div>
      <div className="App__heading">
        <h2>Driver Register</h2>
      </div>
      <Col className='register'>
        <Row justify="center" >
          <Col>
            <Avatar size={60} icon={<UserOutlined />} />
          </Col>
        </Row>
        <Row justify="center">
          <h1 className="App__header">
            Create Driver Account
          </h1>
        </Row>

        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
          }}
          scrollToFirstError
        >

          <Row justify="center">
            <Col xs={20} sm={22}>
              <Form.Item
                name="driver_license"
                label={
                  <Tooltip title="Please Enter Your Driver License">
                    <span>
                      Driver License&nbsp;
                    </span>
                  </Tooltip>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Driver License',
                    whitespace: true,
                  },
                ]}
              >
                  <Input className='register__input' />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={20} sm={22}>

              <Form.Item
                name="car_model"
                label={
                  <Tooltip title="Please Enter Your Car Model">
                    <span>
                      Car Model&nbsp;
                    </span>
                  </Tooltip>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Car Model',
                    whitespace: true,
                  },
                ]}
              >
                <Input className='register__input' />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={20} sm={22}>
              <Form.Item
                name="car_color"
                label={
                  <Tooltip title="Please Enter Your Car Color">
                    <span>
                      Car Color&nbsp;
                    </span>
                  </Tooltip>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Car Color',
                    whitespace: true,
                  },
                ]}
              >
                <Input className='register__input' />
              </Form.Item>
            </Col>
          </Row>


          <Row justify="center">
            <Col xs={20} sm={22}>
              <Form.Item
                name="seat"
                label={
                  <Tooltip title="Please Enter Your Seat">
                    <span>
                      Seat&nbsp;
                    </span>
                  </Tooltip>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Seat',
                    whitespace: true,
                  },
                ]}
              >
                <Input className='register__input' />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={20} sm={22}>
              <Form.Item
                name="bank_account"
                label={
                  <Tooltip title="Please Enter Your Bank account">
                    <span>
                      Bank account&nbsp;
                    </span>
                  </Tooltip>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Bank account',
                    whitespace: true,
                  },
                ]}
              >
                <Input className='register__input' />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col span={24} style={{textAlign: 'center'}}>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                      ? Promise.resolve() 
                      : Promise.reject('Should accept agreement'),
                  },
                ]}
              >
                <Checkbox>
                  Accept our <a href='/privacy-policy'>privacy policy</a>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Form.Item
            >
              <Button
                type="primary"
                htmlType="submit"
                className="App__button"
              >
                Driver Register
              </Button>
            </Form.Item>
          </Row>
        </Form>
        {registerFinish ? <Redirect to="/driver-route" /> : null}
      </Col>
    </div>
  )
}

export default DriverRegister
