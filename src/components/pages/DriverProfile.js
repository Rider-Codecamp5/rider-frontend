import React, { useState, useEffect } from 'react';
import axios from '../../configs/axios';
import { Space, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Avatar, } from 'antd';
import { InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import '../pages/DriverProfile.css';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Navbar';

function DriverProfile() {

  return (
    <div>
      <div className="navTop"></div>
      <Row justify="center" style={{ paddingTop: "20px", paddingBottom: "10px" }}>
        <Col xs={4} sm={2}><Avatar size={60} icon={<UserOutlined />} /></Col>
      </Row>

      <Row justify="center">
        <Col xs={8} sm={4} md={4} lg={3}><h1 className="h1">Create Account</h1></Col>
      </Row>

    </div>
  )
}

export default DriverProfile
