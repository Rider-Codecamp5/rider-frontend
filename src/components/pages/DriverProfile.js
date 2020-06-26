import React, { useState, useEffect } from 'react';
import axios from '../../configs/axios';
import { Space, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Avatar, } from 'antd';
import { InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import '../pages/DriverProfile.css';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Navbar';
import HistoryCard from '../HistoryCard'
import RoleButton from '../RoleButton'
import PassengerProfileCard from '../PassengerProfileCard';
import jwtDecode from 'jwt-decode'

function DriverProfile(props) {

  const { isLogin, setIsLogin, userInfo, setUserInfo } = props

  const [driver, setDriver] = useState({})

  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      const user = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))
      // console.log(user)
      setIsLogin(true)
      setUserInfo(user)
    }
  },[])

  useEffect(() => {
    driverData()
  },[userInfo])

  const driverData = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}` }
    const driverData = await axios.get(`/driver/get/${userInfo.id}`, { headers: headers })
    console.log(userInfo.id)
    console.log(driverData.data)
  }

  return (

    <div className="driver">
      <div className="App__heading">
        <h2>Dave Laravel</h2>
      </div>

      <div className='card__img-box'>
        <img
          src="https://cdn.mos.cms.futurecdn.net/vJvY6J485ReQFXAgx5DSJ3-650-80.jpg"
          alt="profile-pic"
          className='card__profile-img'
        />
      </div>

      <div className="driver__display">
        <h2>Profile information</h2>
        <RoleButton />
        {/* <HistoryCard /> */}
        <PassengerProfileCard />
      </div>

    </div>

  )
}

export default DriverProfile
