import React, { useState, useEffect, useRef } from 'react';
import { Rate, Input, Form, Row, Col, Result, Card } from 'antd';
import '../../styles/PaymentResult';
import HistoryCard from '../HistoryCard';
import * as storageItem from '../../configs/localStorageItems';
import axios from '../../configs/axios';
import { useHistory } from 'react-router-dom';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { CheckCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const PaymentResult = props => {
  const [rating, setRating] = useState(2.5);
  const [tripInfo, setTripInfo] = useState({});
  const [driverPersonalInfo, setDriverPersonalInfo] = useState({});

  let history = useHistory();

  useEffect(() => {
    const getTripInfo = async () => {
      const pathname = window.location.pathname;
      const driverId = pathname.substring(pathname.lastIndexOf('/') + 1);
      let result = await axios.get(`/trip-history/recent/${driverId}`);
      setTripInfo(result.data.selectedHistory);
    };
    getTripInfo();
  }, []);

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

  console.log('trip information id', tripInfo.id);
  const onFinish = async values => {
    console.log('Success:', values);
    console.log(values);
    const body = {
      tripId: tripInfo.id,
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
      <Card bordered={false} style={{textAlign: 'center', padding: '1.5rem 0 0 0'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <CheckCircleOutlined style={{fontSize: '3.5rem', color: '#52c41a', marginBottom: '0.7rem'}} />
          <span style={{fontSize: '1.5rem'}}>Payment Success!</span>
          <span style={{fontSize: '1.2rem', color: 'rgba(0, 0, 0, 0.45)'}}>Driver have received your payment.</span>
        </div>
      </Card>
      <div className='route__form'>
        {/* <h2>Driver Id: {props.match.params.id} received your payment</h2> */}
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
