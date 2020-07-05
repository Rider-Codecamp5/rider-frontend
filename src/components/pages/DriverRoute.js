import React, { useState, useEffect } from 'react';
import DriverMap from '../DriverMap';
import PlaceSearch from '../PlaceSearch';
import axios from '../../configs/axios';
import '../../styles/DriverRoute.css';

import { useLoadScript } from '@react-google-maps/api';
import { DatePicker, TimePicker, Checkbox, InputNumber, Modal, notification, Button } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const libraries = ['places'];

function DriverRoute() {
  // Map
  const [origin, setOrigin] = useState('Origin');
  const [destination, setDestination] = useState('Destination');
  const [geocodeOrigin, setGeocodeOrigin] = useState({});
  const [geocodeDestination, setGeocodeDestination] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [luggage, setLuggage] = useState(false);
  const [seatingCapacity, setSeatingCapacity] = useState('1');
  const [price, setPrice] = useState(10);
  // Modal
  const [visible, setVisible] = useState(false);
  const [driverStatus, setDriverStatus] = useState('create');
  const [passengerData, setPassengerData] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [timestamp, setTimestamp] = useState(0);

  let history = useHistory();

  useEffect(() => {
    async function checkConfirmation() {
      let result = await axios.get('/driver/get');
      let status = result.data.driver.status;
      if (status === 'available' || status === 'selected')
        setDriverStatus('decise');
      // if selected get passenger data
      if (status === 'selected') {
        let passenger = await axios.get(
          `/user/get/${result.data.driver.passenger_id}`
        );
        setPassengerData(passenger.data.userData);
        setIsSelected(true);
      }
      // redirect if already booked
      if (status === 'booked') {
        history.push('/trip/on-going');
      }
    }
    checkConfirmation();
  }, []);

  // ------------- required google places setting -----------
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const getOrigin = ref => {
    console.log('ref origin', ref);
    if (ref) {
      setGeocodeOrigin(ref);
    }
  };

  const getDestination = ref => {
    console.log('ref Destination', ref);
    if (ref) {
      setGeocodeDestination(ref);
    }
  };

  // --------------  input function  --------------------------

  // antD slider mark
  function onDateChange(date, dateString) {
    console.log(date._d);
    // console.log('new Date', Date.parse(date._d));
    setDate(dateString);
    setTimestamp(Date.parse(date._d));
  }

  function onTimeChange(time, timeString) {
    console.log(time, timeString);
    setTime(timeString);
  }

  function onLuggageChange(e) {
    console.log(`checked = ${e.target.checked}`);
    setLuggage(e.target.checked);
  }

  function onSeatingChange(value) {
    console.log('seating', value);
    setSeatingCapacity(value);
  }

  const onPriceChange = value => {
    setPrice(value);
  };

  const getRoute = () => {
    if (origin !== '' && destination !== '') {
      setOrigin(origin);
      setDestination(destination);
    }
  };

  // ----------- AntD confirmation modal ------------
  const showModal = () => {
    setVisible(true);
  };

  const handleOkTrip = async e => {
    console.log(e);
    if (isSelected) {
      let result = await axios.patch('/driver/service/confirm', {
        confirmation: true,
      });
      console.log('handleOk result', result);
      if (result) {
        history.push('/trip/on-going');
      }
    }
    setVisible(false);
  };

  
  const handleCancelTrip = async e => {
    console.log(e);
    if (isSelected) {
      let result = await axios.patch('/driver/service/confirm', {
        confirmation: false,
      });
      console.log('handleCancel result', result);
      // if cancel passenger request, restart interval
      if(result) {
        createRoute();
      }
    }
    setIsSelected(false);
    setVisible(false);
  };

  // for modal closing
  const handleCancel = async e => {
    setVisible(false);
  };


  let yellowButton = isSelected ? '' : 'App__button--yellow';
  let buttonStatus = isSelected ? 'Confirm your trip' : 'Waiting for Passenger';

  // ------------- AntD notification ------------------
  const openNotification = (message) => {
    notification.open({
      message: 'Here Comes a New Passenger',
      description: message,
    });
  };

  // --------- call API ----------------
  const createRoute = async () => {
    getRoute();
    setDriverStatus('decise');

    let body = {
      origin,
      originLat: geocodeOrigin.lat,
      originLng: geocodeOrigin.lng,
      destination,
      destinationLat: geocodeDestination.lat,
      destinationLng: geocodeDestination.lng,
      date: timestamp,
      time,
      luggage,
      seatingCapacity,
      price,
    };

    try {
      let routeData = await axios.patch('/driver/service', body);
      let selectedDriver = await axios.patch('/driver/service/wait');
      let passenger = await axios.get(
        `/user/get/${selectedDriver.data.driver.passenger_id}`
      );
      console.log('routedata', routeData);
      openNotification('You got selected by a passenger!')
      setIsSelected(true);
      setPassengerData(passenger.data.userData);
      console.log(passenger.data.userData.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='route'>
      <div className='App__heading'>
        <h2>
          Create Route <CarOutlined />
        </h2>
      </div>

      <div className='route__form'>
        {driverStatus === 'decise' ? (
          <>
            <button
              className={`App__button ${yellowButton}`}
              onClick={showModal}
            >
              {buttonStatus}
            </button>
            <Modal
              title='Trip Confirmation'
              visible={visible}
              onCancel={handleCancel}
              footer={[
                <Button key="cancel-trip" onClick={handleCancelTrip}>
                  Cancel Trip
                </Button>,
                <Button key="accept-trip" type="primary" onClick={handleOkTrip}>
                  Accept Trip
                </Button>,
              ]}
            >
              {isSelected ? (
                <>
                  <p>
                    <b>Passenger</b>
                  </p>
                  <p>
                    Name: {passengerData.first_name} {passengerData.last_name}
                  </p>
                  <p>Tel: {passengerData.phone_number}</p>
                </>
              ) : (
                <p>
                  You have no companion yet
                  <br />
                  Please wait for your passenger or cancel your offer.
                </p>
              )}
            </Modal>
          </>
        ) : (
          <>
            <PlaceSearch
              place={origin}
              setPlace={setOrigin}
              getPlace={getOrigin}
            />
            <PlaceSearch
              place={destination}
              setPlace={setDestination}
              getPlace={getDestination}
            />

            <div className='route__box--two'>
              <DatePicker
                onChange={onDateChange}
                format={'Do MMMM YYYY'}
                className='route__input--half'
              />
              <TimePicker
                onChange={onTimeChange}
                defaultValue={moment()}
                format='HH:mm'
                minuteStep={10}
                className='route__input--half'
              />
            </div>

            <div>
              <span>Seating Capacity: </span>
              <InputNumber
                min={1}
                max={13}
                defaultValue={1}
                onChange={onSeatingChange}
                className='route__input--small'
              />
            </div>
            <Checkbox onChange={onLuggageChange} className='route__input'>
              Luggage
            </Checkbox>
            <div className='route__price'>
              <b>Price</b>
              <br />
              <div className='route__box--two'>
                <InputNumber
                  min={0}
                  max={1000}
                  step={10.0}
                  value={price}
                  onChange={onPriceChange}
                  formatter={value => `฿ ${value}`}
                  className='route__input--half'
                />
              </div>
            </div>
            <button
              type='primary'
              size='large'
              onClick={createRoute}
              className='App__button'
            >
              Post
            </button>
          </>
        )}
        <DriverMap origin={origin} destination={destination} />
      </div>
      {console.log('ori des', origin, destination)}
      {console.log('geo ori des', geocodeOrigin, geocodeDestination)}
      {console.log(
        'lat lng ori des',
        geocodeOrigin.lat,
        geocodeOrigin.lng,
        geocodeDestination.lat,
        geocodeDestination.lng
      )}
    </div>
  );
}

export default React.memo(DriverRoute);
