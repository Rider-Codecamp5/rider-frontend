import React, { useState, useEffect } from 'react';
import axios from '../../configs/axios';
import { Space, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Avatar, } from 'antd';
import { InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import '../../styles/DriverProfile.css';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Navbar';
import HistoryCard from '../HistoryCard'
import RoleButton from '../RoleButton'
import PassengerProfileCard from '../PassengerProfileCard';
import jwtDecode from 'jwt-decode'
import DriverProfileCard from '../DriverProfileCard';

function DriverProfile(props) {

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo ] = useState({});
  const [passenger, setPassenger] = useState({});
  const [driver, setDriver] = useState(false);
  const [currentRole, setCurrentRole] = useState('passenger');
  const [isPassenger, setIsPassenger] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      const user = jwtDecode(localStorage.getItem('ACCESS_TOKEN'));
      setIsLogin(true)
      setUserInfo(user)
    }
  }, [])

  useEffect(() => {
    passengerData();
    driverData();
  }, [userInfo])

  useEffect(() => {
    if (currentRole == 'driver') {
      setIsPassenger(false)
    } else {
      setIsPassenger(true)
    }
  }, [currentRole])

  const passengerData = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
    const passengerData = await axios.get(`/user/getUser/${userInfo.id}`, { headers: headers });
    console.log(passengerData.data.userData)
    setPassenger(passengerData.data.userData)
  }

  const driverData = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
    const driverData = await axios.get(`/driver/getDriverInformation/${userInfo.id}`, { headers: headers });
    console.log(driverData)
    try {
      console.log('driver from db', driverData.data.driver)
      setDriver(driverData.data.driver)
    } catch (error) {
      setDriver(false)
    }
  }


  return (

    <div className="driver">
      <div className="App__heading">
        {passenger ? <h2>{passenger.first_name} {passenger.last_name}</h2> : null}
      </div>

      {
        passenger ?
          <div className='card__img-box'>
            <img
              src={`${passenger.profile_pic}`}
              alt="profile-pic"
              className='card__profile-img'
            />
          </div>
          :
          null
      }


      <div className="driver__display">
        <h2>Profile information</h2>
        <RoleButton currentRole={currentRole} setCurrentRole={setCurrentRole} />
        {isPassenger ?
          <> {passenger ? <PassengerProfileCard Data={passenger} /> : null} </>
          :
          <> {driver ? <> <DriverProfileCard Data={driver} /> <PassengerProfileCard Data={passenger} /></> : <h1 className="driver__display">Driver profile not found</h1>}</>
        }
      </div>
    </div>

  )
}

export default DriverProfile
