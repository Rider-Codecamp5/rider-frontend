import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { Space, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Avatar, } from 'antd';
import { InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import '../../styles/UserRegisterRoute.css';
import { Link, Redirect } from 'react-router-dom';


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

function UserRegisterRoute() {


    const [registerFinish, setRegisterFinish] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        console.log(values.email)
        console.log(values.name)
        console.log(values.surname)
        console.log(values.address)
        console.log(values.password)
        const body = {
            email: values.email,
            password: values.password,
            profile_pic: values.picture,
            first_name: values.name,
            last_name: values.surname,
            address: values.address,
            phone_number: values.phone_number,
        }

        try {
            const createUser = await axios.post('/user/createUser', body);
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
            <div className="navTop"></div>
            <Row justify="center" style={{ paddingTop: "20px", paddingBottom: "10px" }}>
                <Col xs={4} sm={2}><Avatar size={60} icon={<UserOutlined />} /></Col>
            </Row>
            <Row justify="center">
                <Col xs={8} sm={4} md={4} lg={3}><h1 className="h1">Create Account</h1></Col>
            </Row>

            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                scrollToFirstError
            >
                <Row justify="center">
                    <Col xs={20} sm={22}>
                        <Form.Item
                            name="email"
                            label="E-mail"
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

                <Row justify="center">
                    <Col xs={20} sm={22}>
                        <Form.Item
                            name="password"
                            label="Password"
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

                <Row justify="center">
                    <Col xs={20} sm={22}>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
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

                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={20} sm={22}>
                        <Form.Item
                            name="name"
                            label={
                                <span>
                                    Name&nbsp;
            <Tooltip title="Please Enter Your Name">
                                    </Tooltip>
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
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={20} sm={22}>

                        <Form.Item
                            name="surname"
                            label={
                                <span>
                                    Surname&nbsp;
            <Tooltip title="Please Enter Your Surname">
                                    </Tooltip>
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
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={20} sm={22}>
                        <Form.Item
                            name="address"
                            label={
                                <span>
                                    Address&nbsp;
            <Tooltip title="Please Enter Your Address">
                                    </Tooltip>
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
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={20} sm={22}>
                        <Form.Item
                            name="phone_number"
                            label={
                                <span>
                                    Phone Number&nbsp;
            <Tooltip title="Please Enter Your Phone Number">
                                    </Tooltip>
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Phone Number',
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
                                I have read the <Link to="/PrivacyPolicy">agreement</Link>
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
                                style={{ backgroundColor: "#40CE5D", borderRadius: "none", }}
                            >
                                Create Account
        </Button>
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center" style={{ marginBottom: "50px" }}>
                    <Col xs={12} sm={6}>
                        <Link to="/">Login</Link> | <Link to="">Forget Password?</Link>
                    </Col>

                </Row>

            </Form>

            {registerFinish ? <Redirect to="/" /> : null}
        </div >
    )
}

export default UserRegisterRoute
