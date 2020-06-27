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

function DriverRegister() {
    const [registerFinish, setRegisterFinish] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN")) {
            const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN"));
            // console.log(user)
            setIsLogin(true);
            setUserInfo(user);
            // setRegisterFinish(true);
        }
    }, [])
    
    
    useEffect(() => {   
        checkRegister();
    }, [])
    
    const checkRegister = async () => {
        const headers = { Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}` };
        const driver = await axios.get(`/driver/registered/${userInfo.id}`,{ headers: headers });
        try{
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

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );





    return (
        <div>

            <div className="App__heading">
                <h2>Driver Register</h2>
            </div>
            <Row justify="center" style={{ paddingTop: "20px", paddingBottom: "10px" }}>
                <Col xs={4} sm={2}><Avatar size={60} icon={<UserOutlined />} /></Col>
            </Row>
            <Row justify="center">
                <Col xs={10} sm={8} md={5} lg={4}><h1 className="h1">
                    Create Driver Account
                    </h1>
                </Col>
            </Row>

            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    // residence: ['zhejiang', 'hangzhou', 'xihu'],
                    // prefix: '86',
                }}
                scrollToFirstError
            >

                <Row justify="center">
                    <Col xs={20} sm={22}>
                        <Form.Item
                            name="driver_license"
                            label={
                                <span>
                                    Driver License&nbsp;
            <Tooltip title="Please Enter Your Driver License">
                                    </Tooltip>
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Your Driver License',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={20} sm={22}>

                        <Form.Item
                            name="car_model"
                            label={
                                <span>
                                    Car Model&nbsp;
            <Tooltip title="Please Enter Your Car Model">
                                    </Tooltip>
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Your Car Model',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={20} sm={22}>
                        <Form.Item
                            name="car_color"
                            label={
                                <span>
                                    Car Color&nbsp;
            <Tooltip title="Please Enter Your Car Color">
                                    </Tooltip>
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Your Car Color',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>


                <Row justify="center">
                    <Col xs={20} sm={22}>
                        <Form.Item
                            name="seat"
                            label={
                                <span>
                                    Seat&nbsp;
            <Tooltip title="Please Enter Your Seat">
                                    </Tooltip>
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Your Seat',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>




                <Row justify="center">
                    <Col xs={20} sm={22}>
                        <Form.Item
                            name="bank_account"
                            label={
                                <span>
                                    Bank account&nbsp;
            <Tooltip title="Please Enter Your Bank account">
                                    </Tooltip>
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Your Bank account',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>


                <Row justify="end">
                    <Col xs={10} sm={12} md={11}>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                                },
                            ]}
                            {...tailFormItemLayout}
                        >
                            <Checkbox>
                                Accept our <a href='/privacy-policy'>privacy policy</a>
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col span={8}>
                        <Form.Item
                            {...tailFormItemLayout}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ backgroundColor: "#40CE5D", borderRadius: "none", marginBottom:"60px" }}
                            >
                                Driver Register
        </Button>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>

            {registerFinish ? <Redirect to="/" /> : null}

            <Navbar />
        </div>
    )
}

export default DriverRegister
