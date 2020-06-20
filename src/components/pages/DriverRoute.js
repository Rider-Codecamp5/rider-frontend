import React, { useState } from 'react'
import DriverMap from '../DriverMap';
import PlaceSearch from '../PlaceSearch';
import axios from '../../configs/axios';
import './DriverRoute.css'

import { useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Form, DatePicker, TimePicker, Checkbox, InputNumber, Slider, Button } from 'antd';
import moment from 'moment';

const libraries = ['places']

function DriverRoute() {
  const [origin, setOrigin] = useState('Origin');
  const [destination, setDestination] = useState('Destination');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [luggage, setLuggage] = useState(false);
  const [seatingCapacity, setSeatingCapacity] = useState('1');
  const [price, setPrice] = useState([30, 500]);

  // required google places setting
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if(loadError) return 'Error loading maps';
  if(!isLoaded) return 'Loading Maps';

  function onDateChange(date, dateString) {
    console.log(date, dateString);
    setDate(dateString);
  }

  function onTimeChange(time, timeString) {
    console.log(time, timeString);
    setTime(timeString)
  }

  function onLuggageChange(e) {
    console.log(`checked = ${e.target.checked}`);
    setLuggage(e.target.checked)
  }

  function onSeatingChange(value) {
    console.log('seating', value);
    setSeatingCapacity(value)
  }

  const onMinPriceChange = value => {
    if (isNaN(value)) {
      return;
    }
    if(value < price[1]) {
      setPrice([value, price[1]]);
    }
  };

  const onMaxPriceChange = value => {
    if (isNaN(value)) {
      return;
    }
    if(value > price[0]) {
      setPrice([price[0], value])
    }
  };

  const onAfterPriceChange = value => {
    setPrice(value);
  }

  const createRoute = async() => {
    let body = {
      origin,
      destination,
      date,
      time,
      luggage,
      seatingCapacity
    }

    try {
      let result = await axios.patch('/driver/service', body);
      console.log(result)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='route'>
      <h2>Create Route</h2>
      <PlaceSearch place={origin} setPlace={setOrigin} />
      <PlaceSearch place={destination}  setPlace={setDestination} />

      <div className='route__datetime'>
        <DatePicker onChange={onDateChange} format={'Do MMMM YYYY, dddd'} />
        <TimePicker onChange={onTimeChange} defaultValue={moment('00:00:00', 'HH:mm:ss')} />
      </div>

      <InputNumber min={1} max={13} defaultValue={1} onChange={onSeatingChange} />
      <Checkbox onChange={onLuggageChange}>Luggage</Checkbox>

      {/* Price Range Slider & inputNumber */}
      <div>
        <Slider 
          range 
          defaultValue={[30, 500]} 
          value={
            [ 
              typeof price[0] === 'number' ? price[0] : 0, 
              typeof price[1] === 'number' ? price[1] : 0 
            ]
          }
          min={0} 
          max={1000} 
          onChange={onAfterPriceChange}
        />
        <InputNumber
          min={0}
          max={1000}
          style={{ margin: '0 16px' }}
          step={10.00}
          value={price[0]}
          onChange={onMinPriceChange}
        />
        <InputNumber
          min={0}
          max={1000}
          style={{ margin: '0 16px' }}
          step={10.00}
          value={price[1]}
          onChange={onMaxPriceChange}
        />
      </div>

      <Button type="primary" onClick={createRoute}>Post</Button>

      {/* <DriverMap 
        origin={origin} 
        destination={destination}
        setOrigin={setOrigin}
        setDestination={setDestination} 
        />
      <PlaceSearch/> */}
    </div>
  )
}

export default DriverRoute;