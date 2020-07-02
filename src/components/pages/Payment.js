import React from 'react';
import moment from 'moment';
import Script from 'react-load-script';
import axios from '../../configs/axios';
import {
  CarOutlined,
  CalendarOutlined,
  PushpinOutlined,
  DollarOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import '../../styles/HistoryCard.css';
import { Form, Button } from 'antd';

function Payment() {
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
    OmiseCard.open({
      frameDescription: 'Driver Name Blah...',
      amount: 15000,
      onCreateTokenSuccess: token => {
        console.log(token);
        createInternetBankingCharge('xeus@test.com', 'Driver ', 15000, token);
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = e => {
    e.preventDefault();
    internetBankingConfigure();
    omiseCardHandler();
  };

  return (
    <div className='card'>
      <Script url='https://cdn.omise.co/omise.js' onLoad={handleScriptLoad} />
      <div className='card__content'>
        <div className='card__img-box'>
          <img
            src='https://res.cloudinary.com/xeusteerapat/image/upload/v1593260601/sickfits/rhqsphapuhg3rzsi3ata.jpg'
            alt='Teerapat'
            className='card__profile-img'
          />
          Teerapat
        </div>
        <div className='card__text'>
          <h3>Teerapat</h3>
          <span>
            <b>From</b> Central World
          </span>
          <br />
          <span>
            <PushpinOutlined />
            <b>To</b> Central Ladproa
          </span>
          <br />
          <span>
            <CalendarOutlined />
            {moment().format('MMMM Do YYYY')}
          </span>
          <br />
          <span>
            <CarOutlined /> Benz
          </span>
          <br />
          <span>
            <PhoneOutlined /> 099-9999999
          </span>
          <br />
          <span className='card__price'>
            <DollarOutlined />
            Price 200 Baht
          </span>
        </div>
      </div>
      <div className='card__divider'>{/* horizontal line */}</div>
      <Form>
        <Form.Item>
          <Button id='internet-banking' type='primary' onClick={handleClick}>
            Primary Button
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Payment;
