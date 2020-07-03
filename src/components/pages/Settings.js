import React, { useEffect, useState } from 'react';
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
import jwtDecode from 'jwt-decode'
import { Link, Redirect } from 'react-router-dom';
import RoleButton from '../RoleButton'
import '../../styles/UserSetting.css';


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
      span: 6,
    },
    lg: {
      span: 6,
    }, 
    xl: {
      span: 5,
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

function Settings(props) {

  const [isPassenger, setIsPassenger] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [oldUserData, setOldUserData] = useState({});
  const [oldDriverData, setOldDriverData] = useState({});
  const [updatedFinish, setUpdatedFinish] = useState(false);
  const [profile_pic, setProfilePic] = useState('');

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      const user = jwtDecode(localStorage.getItem('ACCESS_TOKEN'));
      setUserInfo(user);
      setIsLogin(true)
    }
  }, [])

  useEffect(() => {
    getOldUserData();
    getOldDriverData();
  }, [userInfo])

  const getOldUserData = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` };
    const oldUserData = await axios.get(`/user/get/${props.userInfo.id}`, { headers: headers });
    setOldUserData(oldUserData.data.userData)
  }

  const getOldDriverData = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` };
    const oldDriverData = await axios.get('/driver/get', { headers: headers });
    setOldDriverData(oldDriverData.data.driver)
  }

  const [form] = Form.useForm();

  const onFinishPassenger = async values => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` };
    const body = {
      profile_pic,
      first_name: values.name,
      last_name: values.surname,
      address: values.address,
      phone_number: values.phone_number,
    };
    console.log(body)
    const edited = await axios.patch('/user/edit', body, { headers: headers });
    try {
      console.log('OK');
      alert('Data already update');
      form.resetFields();
      setUpdatedFinish(true);
    } catch (err) {
      console.log('fail');
      console.log(err);
      form.resetFields();
      alert('Invalid email');
    }
  };

  const onFinishDriver = async values => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` };
    const body = {
      driver_license: values.driver_license,
      car_model: values.car_model,
      car_color: values.car_color,
      seat: values.seat,
      bank_account: values.bank_account,
    };
    console.log(body)
    const edited = await axios.patch('/driver/edited', body, { headers: headers });
    try {
      console.log('OK');
      alert('Data already update');
      form.resetFields();
      setUpdatedFinish(true);
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

  const resetForm = () => {
    form.resetFields();
  }

  return (
    <div className='userSetting'>
      <div className='App__heading'>
        <h2>Setting</h2>
      </div>
      <Col className='userSetting__display'>
        <Row
          justify='center'
        >
          <Avatar style={{ margin: "1rem" }} size={120} src={oldUserData.profile_pic} />
        </Row>
        <RoleButton isPassenger={isPassenger} setIsPassenger={setIsPassenger} onChange={resetForm} />
        <Row justify='left'>
          <h3>Please enter your update data</h3>
        </Row>
      </Col>


      {isPassenger ?
        <>
          <div>
            <Col xs={24} className='register'>
              <div>
                <Form
                  {...formItemLayout}
                  form={form}
                  name='editPassengerData'
                  onFinish={onFinishPassenger}
                  initialValues={{}}
                  scrollToFirstError
                >
                  
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
                            required: false,
                            message: 'Please Enter Your Name',
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input className='register__input' placeholder={oldUserData.first_name} />
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
                            required: false,
                            message: 'Please Enter Your Surname',
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input className='register__input' placeholder={oldUserData.last_name} />
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
                            required: false,
                            message: 'Please Enter Your Phone number',
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input className='register__input' placeholder={oldUserData.phone_number} />
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
                            required: false,
                            message: 'Please Enter Your Address',
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input className='register__input' placeholder={oldUserData.address} />
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
                    <Col span={24} style={{ textAlign: 'center' }}>
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
                      >
                        <Checkbox>
                          Data is up to date.
                                                {/* <Link to='/PrivacyPolicy' style={{ display: 'inline' }}>agreement</Link> */}
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
                          Edit Passenger Data
                </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
            {updatedFinish ? <Redirect to='/' /> : null}
          </div>

        </>
        :
        <>
          <div>
            <Col xs={24} className='register'>
              <Form
                {...formItemLayout}
                form={form}
                name='editPassengerData'
                onFinish={onFinishDriver}
                initialValues={{}}
                scrollToFirstError
              >

                <Row justify='center'>
                  <Col xs={20} sm={22} md={18} lg={14}>
                    <Form.Item
                      name='driver_license'
                      label={
                        <span>
                          Driver License&nbsp;
                    <Tooltip title='Please Enter Your Driver License'></Tooltip>
                        </span>
                      }
                      rules={[
                        {
                          required: false,
                          message: 'Please Enter Driver License',
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input className='register__input' placeholder={oldDriverData.driver_license} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify='center'>
                  <Col xs={20} sm={22} md={18} lg={14}>
                    <Form.Item
                      name='car_model'
                      label={
                        <span>
                          Car Model&nbsp;
                    <Tooltip title='Please Enter Your Car Model'></Tooltip>
                        </span>
                      }
                      rules={[
                        {
                          required: false,
                          message: 'Please Enter Your Car Model',
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input className='register__input' placeholder={oldDriverData.car_model} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify='center'>
                  <Col xs={20} sm={22} md={18} lg={14}>
                    <Form.Item
                      name='car_color'
                      label={
                        <span>
                          Car Color&nbsp;
                    <Tooltip title='Please Enter Your Car Color'></Tooltip>
                        </span>
                      }
                      rules={[
                        {
                          required: false,
                          message: 'Please Enter Your Car Color',
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input className='register__input' placeholder={oldDriverData.car_color} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify='center'>
                  <Col xs={20} sm={22} md={18} lg={14}>
                    <Form.Item

                      name='seat'
                      label={
                        <span>
                          Seat Available&nbsp;
                    <Tooltip title='Please Enter Your Seat Available'></Tooltip>
                        </span>
                      }
                      rules={[
                        {
                          required: false,
                          message: 'Please Enter Your Seat Available',
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input className='register__input' placeholder={oldDriverData.seat} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify='center'>
                  <Col xs={20} sm={22} md={18} lg={14}>
                    <Form.Item

                      name='bank_account'
                      label={
                        <span>
                          Bank Account&nbsp;
                    <Tooltip title='Please Enter Your Bank Account'></Tooltip>
                        </span>
                      }
                      rules={[
                        {
                          required: false,
                          message: 'Please Enter Your Bank Account',
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input className='register__input' placeholder={oldDriverData.bank_account} />
                    </Form.Item>
                  </Col>
                </Row>

                {/* <Row justify='center'>
                                    <Col xs={20} sm={22}>
                                    <Upload {...imageUploadProps}>
                                        <Button>
                                            <UploadOutlined /> Click to upload
                </Button>
                                    </Upload>
                                    </Col>
                                </Row> */}

                <Row justify='center' >
                  <Col span={24} style={{ textAlign: 'center' }}>
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
                        Data is up to date.
                                                {/* <Link to='/PrivacyPolicy' style={{ display: 'inline' }}>agreement</Link> */}
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
                        Edit Driver Data
                </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
            {updatedFinish ? <Redirect to='/' /> : null}
          </div>

        </>
      }
      {updatedFinish ? <Redirect to='/search-driver' /> : null}
    </div>
  )
}

export default Settings
