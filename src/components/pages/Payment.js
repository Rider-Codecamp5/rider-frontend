import React, { useState, useEffect } from 'react';
import Script from 'react-load-script';
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
    // handleScriptLoad();
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

  console.log(OmiseCard);

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

  const createInternetBankingCharge = async (email, name, amount, token) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/payment/payment-internetBanking',
        data: { email, name, amount, token },
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

  const omiseCardHandler = () => {
    const priceInSatang = currentDriver.price * 100;

    OmiseCard.open({
      frameDescription: `Pay to ${currentDriver.first_name}`,
      amount: priceInSatang,
      onCreateTokenSuccess: token => {
        createInternetBankingCharge(
          currentPassenger.email,
          currentPassenger.first_name,
          priceInSatang,
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
    <div
      className='route__form'
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* <Script url='https://cdn.omise.co/omise.js' onLoad={handleScriptLoad} /> */}
      <div>
        <div>
          Script loaded: <b>{loaded.toString()}</b>
        </div>
        {loaded && !error && handleScriptLoad()}
      </div>
      {renderDriverForPayment()}
      <div className='card__divider'>{/* horizontal line */}</div>
      <Form>
        <Form.Item>
          <Button id='internet-banking' type='primary' onClick={handleClick}>
            Pay Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Payment;
