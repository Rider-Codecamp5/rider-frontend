import React, { useState } from 'react';
import PlaceSearch from '../PlaceSearch';
import axios from '../../configs/axios';
import '../../styles/DriverRoute.css';

import { useLoadScript } from '@react-google-maps/api';
import {
  DatePicker,
  TimePicker,
  Checkbox,
  InputNumber,
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
  const [price, setPrice] = useState(10);
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

  const onPriceChange = value => {
    setPrice(value);
  };

  // --------- call API ----------------
  const findDrivers = async () => {
    const destinationLat = geocodeDestination.lat;
    const destinationLng = geocodeDestination.lng;

    try {
      let result = await axios.get(
        `/user/trip?destinationLat=${destinationLat}
      &destinationLng=${destinationLng}
      &date=${date}&price=${price}
      &time=${time}&luggage=${luggage}
      &seatingCapacity=${seatingCapacity}`
      );

      setDrivers(result.data);
    } catch (err) {
      console.log(err);
    }
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
          firstName={driver.first_name}
          lastName={driver.last_name}
          profilePic={driver.profile_pic}
          phoneNumber={driver.phone_number}
          from={driver.from}
          to={driver.to}
          carModel={driver.car_model}
          seat={driver.seatingCapacity}
          price={driver.price}
          dateTime={driver.createdAt}
          status={driver.status}
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
            defaultValue={moment()}
            format='HH:mm'
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

        <Button
          type='primary'
          size='large'
          onClick={findDrivers}
          className='App__button'
        >
          Search
        </Button>
        {renderResult()}
        <div style={{ textAlign: 'center' }}>
          <span>Wanna become a driver too?</span>
          <br />
          <a href='/driver/register'>Join us now!</a>
        </div>
      </div>
    </div>
  );
}

export default UserRoute;
