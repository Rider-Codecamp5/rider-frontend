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

  const { isLogin, setIsLogin, userInfo, setUserInfo } = props;

  const [passenger, setPassenger] = useState({});

  const [currentRole, setCurrentRole] = useState('passenger');

  const [isPassenger, setIsPassenger] =useState(true)


  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      const user = jwtDecode(localStorage.getItem('ACCESS_TOKEN'));
      setIsLogin(true)
      setUserInfo(user)
    }
  }, [])

  useEffect(() => {
    passengerData();
  }, [userInfo])

  useEffect(() => {
    if(currentRole == 'driver'){
      setIsPassenger(false)
    }else{
      setIsPassenger(true)
    }
  }, [currentRole])

  const passengerData = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
    const passengerData = await axios.get(`/user/getUser/${userInfo.id}`, { headers: headers });
    console.log(passengerData.data.userData)
    setPassenger(passengerData.data.userData)
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
        <RoleButton currentRole={currentRole} setCurrentRole={setCurrentRole} />
        {/* <HistoryCard /> */}

        {isPassenger ? <> {passenger ? <PassengerProfileCard Data={passenger} /> : null} </> : null}



        





      </div>

    </div>

  )
}

export default DriverProfile
