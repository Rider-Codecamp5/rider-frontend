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
import DriverProfileCard from '../DriverProfileCard';
import { SettingTwoTone,SettingFilled,SettingOutlined    } from '@ant-design/icons';
import * as storageItem from '../../configs/localStorageItems';

function Profile(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [passenger, setPassenger] = useState(false);
  const [driver, setDriver] = useState(false);
  const [currentRole, setCurrentRole] = useState('passenger');
  const [isPassenger, setIsPassenger] = useState(true);

  useEffect(() => {
    passengerData();
    driverData();
  }, [])


  const passengerData = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
    const passengerData = await axios.get(`/user/get/${props.userInfo.id}`, { headers: headers });
    try{
      setPassenger(passengerData.data.userData)
    } catch {
      setPassenger(false)
    }
  }

  const driverData = async () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
    const driverData = await axios.get(`/driver/get`, { headers: headers });
    try {
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

      <div style={{padding: '1rem 1rem 0 1rem'}}>
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
          { localStorage.getItem(storageItem.role) === 'driver'
            ? <RoleButton isPassenger={isPassenger} setIsPassenger={setIsPassenger} />
            : null
          }
          <h2>Profile information</h2>
          {isPassenger ?
            <> {passenger ? <PassengerProfileCard Data={passenger} /> : null} </>
            :
            <> {driver ? <DriverProfileCard Data={driver} /> : <h1 className="driver__display">Driver profile not found</h1>}</>
          }
          <button type="button" class="ant-btn App__button ant-btn-primary ant-btn-lg" ><a href="/history">History</a></button>
          <button type="button" class="ant-btn App__button ant-btn-primary ant-btn-lg" ><a href="/settings">Settings <SettingOutlined/></a></button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
