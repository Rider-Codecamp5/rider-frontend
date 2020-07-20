import React, { useState, useEffect, useRef } from 'react';
import * as storageItem from '../../configs/localStorageItems';
import axios from '../../configs/axios';
import { useLoadScript } from '../../utils/useLoadScript';
import '../../styles/HistoryCard.css';
import { Form, Button } from 'antd';
import UserCard from '../UserCard';

function Payment(props) {
  const [currentDriver, setCurrentDriver] = useState({});
  const [currentPassenger, setCurrentPassenger] = useState({});
  const [loaded, error] = useLoadScript('https://cdn.omise.co/omise.js');

  useEffect(() => {
    getCurrentDriver();
  }, []);

  const getCurrentDriver = async () => {
    const result = await axios.get(`/payment/info/${props.match.params.id}`);
    console.log(result.data);
    setCurrentDriver(result.data);
    setCurrentPassenger(result.data.currentPassenger);
  };

  let OmiseCard;
  const handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
      frameLabel: 'RIDER',
      submitLabel: 'PAY NOW',
      currency: 'thb',
    });
  };

  const internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'internet_banking',
      otherPaymentMethods: [
        'bill_payment_tesco_lotus',
        'alipay',
        'pay_easy',
        'net_banking',
        'convenience_store',
      ],
    });
    OmiseCard.configureButton('#internet-banking');
    OmiseCard.attach();
  };

  const createInternetBankingCharge = async (
    passengerEmail,
    passengerName,
    driverId,
    driverEmail,
    driverName,
    amount,
    passengerOriginLocation,
    token
  ) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/payment/payment-internetBanking',
        data: {
          passengerEmail,
          passengerName,
          driverId,
          driverEmail,
          driverName,
          amount,
          passengerOriginLocation,
          token,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { authorizeUri } = res.data;
      if (authorizeUri) {
        window.location.href = authorizeUri;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const passengerOriginLocation = JSON.parse(
    localStorage.getItem(storageItem.passengerOriginLocation)
  ).place;

  const omiseCardHandler = () => {
    const priceInSatang = currentDriver.price * 100;

    OmiseCard.open({
      frameDescription: `Pay to ${currentDriver.first_name}`,
      amount: priceInSatang,
      onCreateTokenSuccess: token => {
        createInternetBankingCharge(
          currentPassenger.email,
          currentPassenger.first_name,
          currentDriver.id,
          currentDriver.first_name,
          currentDriver.email,
          priceInSatang,
          passengerOriginLocation,
          token
        );
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = e => {
    e.preventDefault();
    internetBankingConfigure();
    omiseCardHandler();
  };

  const renderDriverForPayment = () => {
    if (!currentDriver) {
      return <h2>Loading...</h2>;
    }

    return (
      <UserCard
        from={currentDriver.from}
        to={currentDriver.to}
        dateTime={currentDriver.date_time}
        profilePic={currentDriver.profile_pic}
        firstName={currentDriver.first_name}
        lastName={currentDriver.last_name}
        price={currentDriver.price}
        phoneNumber={currentDriver.phone_number}
      />
    );
  };

  return (
    <div>
      <div className='App__heading'>
        <h2>Payment</h2>
      </div>
      <div
        className='route__form'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {/* <Script url='https://cdn.omise.co/omise.js' onLoad={handleScriptLoad} /> */}
        <div>
          {loaded && !error && handleScriptLoad()}
        </div>
        {renderDriverForPayment()}
        <Form>
          <Form.Item>
            <button
              id='internet-banking'
              className='App__button'
              onClick={handleClick}
            >
              Pay Now
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Payment;
