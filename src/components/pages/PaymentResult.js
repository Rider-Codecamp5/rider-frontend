import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Rate, Input, Form, Row, Col } from 'antd';
import '../../styles/PaymentResult';
import HistoryCard from '../HistoryCard';
import * as storageItem from '../../configs/localStorageItems';
import axios from '../../configs/axios';
import { useHistory } from 'react-router-dom';

const { TextArea } = Input;

const PaymentResult = props => {
  const [rating, setRating] = useState(2.5);
  const [tripInfo, setTripInfo] = useState({});
  const [driverPersonalInfo, setDriverPersonalInfo] = useState({});

  const socketRef = useRef();

  let history = useHistory();

  useEffect(() => {
    // Send message to driver after paid
    socketRef.current = io.connect('/');
    socketRef.current.emit('message', props.userInfo.name);

    const getTripInfo = async () => {
      let result = await axios.get('/trip-history/recent');
      console.log('recent trip', result.data.selectedHistory);
      setTripInfo(result.data.selectedHistory);
    };
    getTripInfo();
  }, []);

  console.log('trip info', tripInfo);
  useEffect(() => {
    const getDriverPersonalInfo = async () => {
      let result = await axios.get(`/user/get/${tripInfo.driver_id}`);
      setDriverPersonalInfo(result.data.userData);
    };
    getDriverPersonalInfo();
  }, [tripInfo]);

  let passengerOrigin = JSON.parse(
    localStorage.getItem(storageItem.passengerOriginLocation)
  ).place;

  const onFinish = async values => {
    console.log('Success:', values);
    console.log(values);
    const body = {
      driverId: driverPersonalInfo.id,
      rating: values.tripRating,
      passengerReview: values.tripReview,
    };

    await axios.post('/trip-history/review', body);

    history.push('/');
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Col>
      <div className='App__heading'>
        <h2>Payment Result</h2>
      </div>
      <div className='route__form'>
        <h2>Payment Succeeded to driver id: {props.match.params.id}</h2>
        {driverPersonalInfo && tripInfo ? (
          <HistoryCard
            profilePic={driverPersonalInfo.profile_pic}
            firstName={driverPersonalInfo.first_name}
            lastName={driverPersonalInfo.last_name}
            from={passengerOrigin}
            to={tripInfo.to}
            dateTime={tripInfo.date_time}
            carModel={tripInfo.car_model}
            carColor={tripInfo.car_color}
            driverLicense={tripInfo.driver_license}
            phoneNumber={driverPersonalInfo.phone_number}
            price={tripInfo.price}
          />
        ) : null}

        <Form
          name='trip-review'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <span style={{ marginTop: '1rem', fontSize: '1rem' }}>Review</span>
          <Row>
            <Col span={24}>
              <Form.Item name='tripReview'>
                <TextArea rows={6} style={{ borderRadius: '5px' }} />
              </Form.Item>
            </Col>
          </Row>

          <span style={{ fontSize: '1rem' }}>Rate your Trip</span>
          <Row justify='center'>
            <Form.Item
              name='tripRating'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Rate
                allowHalf
                value={rating}
                defaultValue={2.5}
                onChange={value => setRating(value)}
              />
            </Form.Item>
          </Row>

          <button className='App__button'>Submit Review</button>
        </Form>
      </div>
    </Col>
  );
};

export default PaymentResult;
