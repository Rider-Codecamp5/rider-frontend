import React, { useState, useEffect } from 'react';
import axios from '../../configs/axios';
import { Space, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Avatar, } from 'antd';
import { InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import '../pages/DriverProfile.css';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Navbar';

function DriverProfile() {

  return (
  
      <div className="driver-profile">
        <div className="App__heading">
          <h2>Dave Laravel</h2>
        </div>
        <div>
          
        </div>

      </div>

  )
}

export default DriverProfile
