import React, { useState, useEffect } from 'react';
import axios from '../../configs/axios';
import { Button } from 'antd';
import { useLoadScript } from '@react-google-maps/api';
// import moment from 'moment';
import DriverMap from '../DriverMap';
import HistoryCard from '../HistoryCard';

import '../../styles/DriverRoute.css';
import '../../containers/App.css';

const libraries = ['places'];

function RouteDetails(props) {
  const [origin, setOrigin] = useState('Origin');
  const [destination, setDestination] = useState('Destination');
  const [geocodeOrigin, setGeocodeOrigin] = useState({});
  const [geocodeDestination, setGeocodeDestination] = useState([]);

  // ------------- Driver and Route details ---------------- /
  const [routeDetails, setRouteDetails] = useState({});

  // ------------- required google places setting -----------
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    getDriver();
  }, []);

  // --------- call API ----------------
  const getDriver = async () => {
    try {
      const result = await axios.get(`/user/trip/${props.match.params.id}`);
      const originGeoCode = {
        lat: result.data.from_lat,
        lng: result.data.from_lng,
      };
      const destinationGeoCode = {
        lat: result.data.to_lat,
        lng: result.data.to_lng,
      };

      setRouteDetails(result.data);
      setOrigin(originGeoCode);
      setDestination(destinationGeoCode);
    } catch (err) {
      console.log(err);
    }
  };

  // const token = localStorage.getItem('ACCESS_TOKEN');
  // const info = jwtDecode(token);
  // console.log('decoded token', info);
  // console.log(props);

  const selectDriver = async () => {
    await axios({
      method: 'patch',
      url: `/driver/service/join`,
      data: {
        passengerId: props.userInfo.id,
        driverId: Number(props.match.params.id),
      },
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
      // },
    });
  };

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

  const getRoute = () => {
    if (origin !== '' && destination !== '') {
      setOrigin(origin);
      setDestination(destination);
    }
  };

  const renderRouteDetail = () => {
    if (!routeDetails) {
      return <p>loading...</p>;
    }

    const {
      from,
      to,
      car_model,
      price,
      seating_capacity,
      updatedAt,
    } = routeDetails;

    return (
      <HistoryCard
        from={from}
        to={to}
        carModel={car_model}
        price={price}
        seat={seating_capacity}
        dateTime={updatedAt}
      />
    );
  };

  return (
    <div className='route'>
      <div className='App__heading'>
        <h2>Route Details</h2>
      </div>
      <div className='route__form'>
        {renderRouteDetail()}
        <DriverMap origin={origin} destination={destination} />
        <Button type='primary' block style={{ marginBottom: '1rem' }}>
          Call Driver
        </Button>
        <Button type='#95de64' block onClick={selectDriver}>
          Join Trip
        </Button>
      </div>
    </div>
  );
}

export default React.memo(RouteDetails);
