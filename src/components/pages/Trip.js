import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DriverMap from '../DriverMap';
import HistoryCard from '../HistoryCard';
import UserCard from '../UserCard';
import axios from '../../configs/axios';
import * as storageItem from '../../configs/localStorageItems';

import { Button, Modal } from 'antd';
import io from 'socket.io-client';
import { useLoadScript } from '@react-google-maps/api';
const libraries = ['places'];

function Trip(props) {
  const [tripData, setTripData] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [origin, setOrigin] = useState({ lat: null, lng: null });
  const [destination, setDestination] = useState({ lat: null, lng: null });
  const [isDriver, setIsDriver] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [tripMessage, setTripMessage] = useState('');

  const history = useHistory();
  // const socketRef = useRef();
  const { socketRef } = props;

  let passengerOrigin = JSON.parse(
    localStorage.getItem(storageItem.passengerOriginLocation)
  );

  // need useEffect because tripData state is changed
  useEffect(() => {
    try {
      // user can be passenger or driver
      const getCurrentTrip = async () => {
        let user = await axios.get('/driver/service/current');
        let currentTrip = user.data.currentTrip;
        let roleInTrip = user.data.roleInTrip;
        setTripData(currentTrip);
        if (currentTrip) {
          setOrigin({ lat: currentTrip.from_lat, lng: currentTrip.from_lng });
          setDestination({ lat: currentTrip.to_lat, lng: currentTrip.to_lng });

          // set Driver Personal Info according to currentTrip data
          if (roleInTrip === 'driver') {
            let result = await axios.get(
              `/user/get/${currentTrip.passenger_id}`
            );
            setPersonalInfo(result.data.userData);
            setIsDriver(true);
          }

          if (roleInTrip === 'passenger') {
            let result = await axios.get(`/user/get/${currentTrip.id}`);
            setPersonalInfo(result.data.userData);
            setIsDriver(false);
          }
        }
      };
      getCurrentTrip();
      
    } catch (err) {
      console.log(err.response);
    }

    // Waiting payment message
    // socketRef.current = io.connect('/');
    socketRef.current.on('paymentMessage', result => {
      if(result.receiverId === props.userInfo.id) {
        setTripMessage(result.message)
        setModalVisible(true);
      }
    })

    socketRef.current.on('cancelTrip', result => {
      if(isDriver) {
        console.log(result)
        setTripMessage(`${result.message} by driver`)
        setModalVisible(true);
      } else {
        setTripMessage(`${result.message} by passenger`)
        console.log(result)
        setModalVisible(true);
      }
    });
  }, []);

  const onCancelTrip = async() => {
    const body = {
      userId: props.userInfo.id
    };

    if(isDriver) {
      let result = await axios.patch('/driver/service/cancel', body)
      console.log('driver cancel result', result);
    } else {
      let result = await axios.patch('/user/trip/cancel', body) 
      console.log('passenger cancel result', result);
    }
  }

    // ------------ AntD Modal -------------
      
    const handleOk = e => {
      history.push('/');
      setModalVisible(false);
    };
    

  // ------------- required google places setting -----------
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const checkBooked = () => {
    try {
      if (tripData.status === 'booked') {
        return (
          <div
            className='route__form'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <span style={{ fontSize: '1.2rem' }}>
              <b>From: </b>
              {isDriver ? tripData.from : passengerOrigin.place}
            </span>
            <span style={{ fontSize: '1.2rem' }}>
              <b>To: </b>
              {tripData.to}
            </span>
            <div>
              {console.log(origin)}
              {console.log(destination)}
              {isDriver ? (
                <DriverMap origin={origin} destination={destination} />
              ) : (
                <DriverMap
                  origin={passengerOrigin.geocode}
                  destination={destination}
                />
              )}
            </div>
            {console.log(personalInfo)}
            {isDriver ? (
              <UserCard
                id={personalInfo.id}
                firstName={personalInfo.first_name}
                lastName={personalInfo.last_name}
                profilePic={personalInfo.profile_pic}
                phoneNumber={personalInfo.phone_number}
                // แก้เป็น origin ของ driver
                from={tripData.from}
                to={tripData.to}
                seat={tripData.seat}
                price={tripData.price}
                dateTime={tripData.createdAt}
                status={tripData.status}
              />
            ) : (
              <HistoryCard
                id={personalInfo.id}
                firstName={personalInfo.first_name}
                lastName={personalInfo.last_name}
                profilePic={personalInfo.profile_pic}
                phoneNumber={personalInfo.phone_number}
                from={tripData.from}
                to={tripData.to}
                carColor={tripData.car_color}
                carModel={tripData.car_model}
                driverLicense={tripData.driver_license}
                seat={tripData.seating_capacity}
                price={tripData.price}
                dateTime={tripData.createdAt}
                status={tripData.status}
              />
            )}
            {isDriver ? null : (
              <Link to={`/payment/${personalInfo.id}`}>
                <button className='App__button'>Pay Now</button>
              </Link>
            )}
            <button className='App__button App__button--red' onClick={onCancelTrip}>Cancel Trip</button>
          </div>
        );
      } else {
        return (
          <h1 style={{ textAlign: 'center', margin: '2rem' }}>
            You have no current trip
          </h1>
        );
      }
    } catch (err) {
      return (
        <h1 style={{ textAlign: 'center', margin: '2rem' }}>
          You have no current trip
        </h1>
      );
    }
  };

  return (
    <div className='route'>
      <div className='App__heading'>
        <h2>Current Trip</h2>
      </div>
      {checkBooked()}

      <Modal
      title="Notification"
      visible={modalVisible}
      onOk={handleOk}
      footer={[
        <Button key="ok" onClick={handleOk}>
          Ok
        </Button>,
      ]}
      >
      <p>{tripMessage}</p>
      </Modal>
    </div>
  );
}

export default Trip;
