import React, { useState } from 'react';
import DriverMap from '../DriverMap';
import PlaceSearch from '../PlaceSearch';
import axios from '../../configs/axios';
import '../../styles/DriverRoute.css';

import { useLoadScript } from '@react-google-maps/api';
import {
  DatePicker,
  TimePicker,
  Checkbox,
  InputNumber,
  Slider,
  Modal,
} from 'antd';
import moment from 'moment';

const libraries = ['places']
const marks = {
  0: '฿0',
  1000: '฿1,000'
}

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
  const [price, setPrice] = useState([30, 500]);
  // Modal
  const [visible, setVisible] = useState(false);
  const [driverStatus, setDriverStatus] = useState('create');
  const [passengerData, setPassengerData] = useState({});
  const [isSelected, setIsSelected] = useState(false);

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
    console.log(date, dateString);
    setDate(dateString);
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

  const onMinPriceChange = value => {
    if (isNaN(value)) {
      return;
    }
    if (value < price[1]) {
      setPrice([value, price[1]]);
    }
  };

  const onMaxPriceChange = value => {
    if (isNaN(value)) {
      return;
    }
    if (value > price[0]) {
      setPrice([price[0], value]);
    }
  };

  const onAfterPriceChange = value => {
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

  const handleOk = async(e) => {
    console.log(e);
    if(isSelected) {
      let result = await axios.patch('/driver/service/confirm', { confirmation: true });
      console.log('handleOk result', result);
    }
    setVisible(false);
  };

  const handleCancel = async(e) => {
    console.log(e);
    if(isSelected) {
      let result = await axios.patch('/driver/service/confirm', { confirmation: false });
      console.log('handleCancel result', result)
    }
    setVisible(false);
  };

  // --------- call API ----------------
  const createRoute = async () => {
    getRoute();
    setDriverStatus('decise');
    const headers = { Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}` }
    let body = {
      origin,
      originLat: geocodeOrigin.lat,
      originLng: geocodeOrigin.lng,
      destination,
      destinationLat: geocodeDestination.lat,
      destinationLng: geocodeDestination.lng,
      date,
      time,
      luggage,
      seatingCapacity,
    };
    
    try {
      let routeData = await axios.patch('/driver/service', body, { headers: headers });
      let selectedDriver = await axios.patch('/driver/service/wait');
      let passenger = await axios.get(`/user/getUser/${selectedDriver.data.driver.passenger_id}`)
      console.log('routedata', routeData);
      alert('finish');
      setIsSelected(true);
      setPassengerData(passenger.data.userData);
      console.log(passenger.data.userData.id)
    } catch(error) {
      console.log(error)
    }
  };

  return (
    <div className='route'>
      <div className='App__heading'>
        <h2>Create Route</h2>
      </div>


      <div className='route__form'>
      {(driverStatus === 'decise') 
        ? 
        <>
          <button className='App__button' onClick={showModal}>Confirm</button> 
          <Modal
            title="Basic Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {(isSelected)
            ? 
              <>
                <p>Passenger</p>
                <p>{passengerData.first_name}</p>
                <p>{passengerData.phone_number}</p>
              </>
            :
              <p>
                You have no companion yet<br/>
                Please wait for your passenger or cancel your offer.
              </p>
            }
          </Modal>
        </>
        : 
        <>
          <PlaceSearch place={origin} setPlace={setOrigin} getPlace={getOrigin} />
          <PlaceSearch
            place={destination}
            setPlace={setDestination}
            getPlace={getDestination}
          />

          <div className='route__box--two'>
            <DatePicker
              onChange={onDateChange}
              format={'Do MMMM YYYY, dddd'}
              className='route__input--half'
            />
            <TimePicker
              onChange={onTimeChange}
              defaultValue={moment('00:00:00', 'HH:mm:ss')}
              className='route__input--half'
            />
          </div>

          <div>
            <span>Seating Capacity: </span>
            <InputNumber min={1} max={13} defaultValue={1} onChange={onSeatingChange} className='route__input--small' />
          </div>
          <Checkbox onChange={onLuggageChange} className='route__input'>
            Luggage
          </Checkbox>

          {/* Price Range Slider & inputNumber */}
          <div className='route__price'>
            <b>Price range</b>
            <Slider
              range
              marks={marks}
              defaultValue={[30, 500]}
              value={[
                typeof price[0] === 'number' ? price[0] : 0,
                typeof price[1] === 'number' ? price[1] : 0,
              ]}
              min={0}
              max={1000}
              onChange={onAfterPriceChange}
              className='route__input'
            />
            <br />
            <div className='route__box--two'>
              <InputNumber
                min={0}
                max={1000}
                step={10.0}
                value={price[0]}
                onChange={onMinPriceChange}
                formatter={value => `฿ ${value}`}
                className='route__input--half'
              />
              <InputNumber
                min={0}
                max={1000}
                step={10.0}
                value={price[1]}
                onChange={onMaxPriceChange}
                formatter={value => `฿ ${value}`}
                className='route__input--half'
              />
            </div>
          </div>

          <button type='primary' size='large' onClick={createRoute} className='App__button'>Post</button>
        </>
        }

        <DriverMap 
          origin={origin} 
          destination={destination}
        />
      </div>
      {console.log('ori des', origin, destination)}
      {console.log('geo ori des', geocodeOrigin, geocodeDestination)}
      {console.log(
        'lat lng ori des',
        geocodeOrigin.lat,
        geocodeOrigin.lng,
        geocodeDestination.lat,
        geocodeDestination.lng,
      )}
    </div>
  );
}

export default React.memo(DriverRoute);
