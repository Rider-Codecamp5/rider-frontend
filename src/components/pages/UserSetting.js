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
import {Link, Redirect } from 'react-router-dom';
import RoleButton from '../RoleButton'
import '../pages/UserSetting.css'

function UserSetting() {

    const [isPassenger, setIsPassenger] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [oldUserData, setOldUserData] = useState({});
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
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
    }, [userInfo])

    const getOldUserData = async () => {
        const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` };
        const oldUserData = await axios.get('/user/get', { headers: headers });
        setOldUserData(oldUserData.data.userData)
    }

    const onFinish = async () => {
        console.log(name, surName, phoneNumber, address);
        const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` };
        const body = {
            first_name: name,
            last_name: surName,
            address,
            phone_number: phoneNumber,
            profile_pic,
        }
        const edited = await axios.patch('user/edit', body, { headers: headers });
        try {
            setName('')
            setSurName('')
            setPhoneNumber('')
            setAddress('')
            setUpdatedFinish(true)
            alert('Data user updated')
        } catch (error) {
            console.log(error)
        }
    }






    return (
        <div>
            <h1>This pages is User Setting </h1>


            <RoleButton isPassenger={isPassenger} setIsPassenger={setIsPassenger} />

            {isPassenger ?
                <>
                    <h1 className='title'>Passenger</h1>
                    <div className='textBox'>
                        <div className='textBox__label'><label>Name</label></div>
                        <input className='textBox__Input' placeholder={oldUserData.first_name} onChange={(e) => setName(e.target.value)} value={name}></input>
                        <br />
                        <br />
                    </div>
                    <div>
                        <div><label>Surname</label></div>
                        <input placeholder={oldUserData.last_name} onChange={(e) => setSurName(e.target.value)} value={surName}></input>
                        <br />
                        <br />
                    </div>
                    <div>
                        <div><label>PhoneNumber</label></div>
                        <input placeholder={oldUserData.phone_number} onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}></input>
                        <br />
                        <br />
                    </div>
                    <div>
                        <div><label>Address</label></div>
                        <input placeholder={oldUserData.address} onChange={(e) => setAddress(e.target.value)} value={address}></input>
                        <br />
                        <br />
                    </div>
                    <button onClick={onFinish}>Submit</button>
                </>
                :
                <>
                    <h1>Driver</h1>

                </>
            }












            {updatedFinish ? <Redirect to='/search-driver' /> : null}
        </div>
    )
}

export default UserSetting
