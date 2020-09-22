import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from '../../configs/axios';
import { Button, Modal } from 'antd';
import { useLoadScript } from '@react-google-maps/api';
// import moment from 'moment';
import DriverMap from '../DriverMap';
import '../../styles/DriverRoute.css';

import { useHistory } from 'react-router-dom';
import {
  CarOutlined,
  CalendarOutlined,
  PushpinOutlined,
  TeamOutlined,
  DollarOutlined,
  PhoneOutlined,
  NumberOutlined,
} from '@ant-design/icons';

const libraries = ['places'];

function RouteDetails(props) {
  const [origin, setOrigin] = useState('Origin');
  const [destination, setDestination] = useState('Destination');
  const [, setGeocodeOrigin] = useState({});
  const [, setGeocodeDestination] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmResult, setConfirmResult] = useState('');

  let history = useHistory();
  const { socketRef } = props;
  // const socketRef = useRef();
  // socketRef.current = io.connect('/');

  // ------------- Driver and Route details ---------------- /
  const [routeDetails, setRouteDetails] = useState({});

  // ------------- required google places setting -----------
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    getDriver();

    socketRef.current.on('driverConfirmed', result => {
      console.log(result);
      if (result.receiverId === props.userInfo.id) {
        setConfirmMessage(result.message);
        setConfirmResult(result.result);
        showModal();
      }
    });

    socketRef.current.on('driverRejected', result => {
      if (result.receiverId === props.userInfo.id) {
        setConfirmMessage(result.message);
        setConfirmResult(result.result);
        showModal();
      }
    });
  }, []);

  // ------------ AntD Modal -------------
  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = e => {
    if (confirmResult === 'confirmed') {
      history.push('/trip/on-going');
    }
    if (confirmResult === 'rejected') {
      history.push('/');
    }
    setModalVisible(false);
  };

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

      if (result.data.status === 'selected') {
        setIsWaiting(true);
      }

      setRouteDetails(result.data);
      setOrigin(originGeoCode);
      setDestination(destinationGeoCode);
    } catch (err) {
      console.log(err);
    }
  };

  const selectDriver = async () => {
    try {
      await axios({
        method: 'patch',
        url: `/driver/service/join`,
        data: {
          passengerId: props.userInfo.id,
          driverId: Number(props.match.params.id),
        },
      });
      setIsWaiting(true);
    } catch (err) {
      console.log(err);
    }
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
      first_name,
      last_name,
      phone_number,
      from,
      to,
      driver_license,
      car_model,
      car_color,
      price,
      seating_capacity,
      date_time,
      profile_pic,
    } = routeDetails;

    return (
      <div>
        {console.log('Route Detail Props', props)}
        {console.log(props.location)}
        <div
          className='card__text'
          style={{ width: '100%', padding: '0.2rem 1rem' }}
        >
          <div className='card__profile'>
            <div className='card__img-box'>
              <img
                src={profile_pic}
                alt={`${first_name} ${last_name}`}
                className='card__profile-img'
              />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0' }}>
              {first_name} {last_name}
            </h3>
          </div>
          <div
            className='card'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <span>
              {' '}
              <b>From</b> {from}
            </span>
            <span>
              <PushpinOutlined /> <b>To</b> {to}
            </span>
            <span>
              <CalendarOutlined /> <b>Date</b>{' '}
              {moment(Number(date_time)).format('MMMM Do YYYY, HH:mm')}
            </span>
            <div className='card__divider' style={{ paddingTop: '1rem' }}>
              {/* horizontal line */}
            </div>
            <div className='card__text card__footer' style={{ width: '100%' }}>
              <span>
                <CarOutlined /> {car_model} / {car_color}
              </span>
              <span>
                <TeamOutlined /> {seating_capacity} seats available
              </span>
              <span>
                <NumberOutlined /> <b>Plate number</b> {driver_license}
              </span>
              <span>
                <PhoneOutlined /> {phone_number}
              </span>
              <span className='card__price'>
                <DollarOutlined />
                Price {price} Baht
              </span>
            </div>
          </div>
        </div>
        <Modal
          title='Driver Response'
          visible={modalVisible}
          onOk={handleOk}
          footer={[
            <Button key='ok' onClick={handleOk}>
              Ok
            </Button>,
          ]}
        >
          <p>{confirmMessage}</p>
        </Modal>
      </div>
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
        {isWaiting ? (
          <button className='App__button App__button--yellow'>
            Waiting for Driver Confirmation
          </button>
        ) : (
          <Button type='#95de64' block onClick={selectDriver}>
            Join Trip
          </Button>
        )}
      </div>
    </div>
  );
}

export default React.memo(RouteDetails);
