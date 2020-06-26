import React, { useEffect, useState } from 'react';
import axios from '../../configs/axios';
import jwtDecode from 'jwt-decode'
import { Redirect } from 'react-router-dom';
import RoleButton from '../RoleButton'

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

    const [carModel, setCarModel] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [carColor, setCarColor] = useState('');
    const [seat, setSeat] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [oldDriverData, setOldDriverData] = useState({});

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
        const oldUserData = await axios.get('/user/get', { headers: headers });
        setOldUserData(oldUserData.data.userData)
    }

    const getOldDriverData = async () => {
        const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` };
        const oldDriverData = await axios.get('/driver/get', { headers: headers });
        setOldDriverData(oldDriverData.data.driver)
        console.log(oldDriverData.data.driver)
    }

    const onFinishPassenger = async () => {
        console.log(name, surName, phoneNumber, address);
        const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` };
        const body = {
            first_name: name,
            last_name: surName,
            address,
            phone_number: phoneNumber,
            profile_pic,

        }


        const edited = await axios.patch('/user/edit', body, { headers: headers });
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

    const onFinishDriver = async () => {
        console.log('object')
        const headers = { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` };
        const body = {
            driver_license: driverLicense,
            car_model: carModel,
            car_color: carColor,
            bank_account: bankAccount,
        }

        const edited = await axios.patch('/driver/edited', body, { headers: headers });
        try {
            setDriverLicense('')
            setCarModel('')
            setCarColor('')
            setBankAccount('')
            setUpdatedFinish(true)
            alert('Data driver updated')
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
                    <h1>Passenger</h1>
                    <div>
                        <div><label>Name</label></div>
                        <input placeholder={oldUserData.first_name} onChange={(e) => setName(e.target.value)} value={name}></input>
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
                    <button onClick={onFinishPassenger}>Submit</button>
                </>
                :
                <>
                    <h1>Driver</h1>
                    <div>
                        <div><label>Driver License</label></div>
                        <input placeholder={oldDriverData.driver_license} onChange={(e) => setDriverLicense(e.target.value)} value={driverLicense}></input>
                        <br />
                        <br />
                    </div>
                    <div>
                        <div><label>Car Model</label></div>
                        <input placeholder={oldDriverData.car_model} onChange={(e) => setCarModel(e.target.value)} value={carModel}></input>
                        <br />
                        <br />
                    </div>
                    <div>
                        <div><label>Car Color</label></div>
                        <input placeholder={oldDriverData.car_color} onChange={(e) => setCarColor(e.target.value)} value={carColor}></input>
                        <br />
                        <br />
                    </div>
                    <div>
                        <div><label>Bank account</label></div>
                        <input placeholder={oldDriverData.bank_account} onChange={(e) => setBankAccount(e.target.value)} value={bankAccount}></input>
                        <br />
                        <br />
                    </div>
                    <button onClick={onFinishDriver}>Submit</button>

                </>
            }


            {updatedFinish ? <Redirect to='/search-driver' /> : null}
            
        </div>
    )
}

export default UserSetting
