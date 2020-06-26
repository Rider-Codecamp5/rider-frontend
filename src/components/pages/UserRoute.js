import React, { useState } from 'react';
import PlaceSearch from '../PlaceSearch';
import axios from '../../configs/axios';
import './DriverRoute.css';

import { useLoadScript } from '@react-google-maps/api';
import {
  DatePicker,
  TimePicker,
  Checkbox,
  InputNumber,
  Slider,
  Button,
  Spin,
  Space,
} from 'antd';
import moment from 'moment';
import HistoryCard from '../HistoryCard';
import { Link } from 'react-router-dom';

const libraries = ['places'];

function UserRoute() {
  const [origin, setOrigin] = useState('Origin');
  const [destination, setDestination] = useState('Destination');
  const [, setGeocodeOrigin] = useState({});
  const [geocodeDestination, setGeocodeDestination] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [luggage, setLuggage] = useState(false);
  const [seatingCapacity, setSeatingCapacity] = useState('1');
  const [price, setPrice] = useState([30, 500]);
  const [drivers, setDrivers] = useState([]);

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
  const marks = {
    0: '฿0',
    1000: '฿1,000',
  };

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

  // --------- call API ----------------
  const findDrivers = async () => {
    const destinationLat = geocodeDestination.lat;
    const destinationLng = geocodeDestination.lng;

    let result = await axios.get(
      `/user/trip?destinationLat=${destinationLat}&destinationLng=${destinationLng}`
    );

    setDrivers(result.data);
  };

  const renderResult = () => {
    if (!drivers) {
      return (
        <Space size='middle'>
          <Spin size='large' />
        </Space>
      );
    }

    return drivers.map(driver => (
      <Link to={`/driver/route-details/${driver.id}`} key={driver.id}>
        <HistoryCard
          id={driver.id}
          driverName='Driver Name'
          from={driver.from}
          to={driver.to}
          carModel={driver.car_model}
          seat={driver.seatingCapacity}
          price={driver.price}
          dateTime={driver.createdAt}
        />
      </Link>
    ));
  };

  return (
    <div className='route'>
      <div className='App__heading'>
        <h2>Search Rider</h2>
      </div>
      <div className='route__form'>
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

        <Button
          type='primary'
          size='large'
          onClick={findDrivers}
          className='App__button'
        >
          Search
        </Button>
        {renderResult()}
        <div style={{textAlign: 'center'}}>
          <span>Wanna become a driver too?</span>
          <br/>
          <a href='/driver/register'>Join us now!</a>
        </div>
      </div>
    </div>
  );
}

export default UserRoute;
