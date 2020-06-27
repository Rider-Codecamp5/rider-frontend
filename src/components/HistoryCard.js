import React, { useState } from 'react';
import moment from 'moment';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CarOutlined,
  CalendarOutlined,
  PushpinOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import '../styles/HistoryCard.css';

function HistoryCard(props) {
  return (
    <div className='card'>
      <div className='card__content'>
        <div className='card__img-box'>
          <img
            src='https://cdn.mos.cms.futurecdn.net/vJvY6J485ReQFXAgx5DSJ3-650-80.jpg'
            alt='profile-pic'
            className='card__profile-img'
          />
        </div>
        <div className='card__text'>
          <h3>{props.name}</h3>
          <span>
            <b>From</b> {props.from}
          </span>
          <br />
          <span>
            <PushpinOutlined />
            <b>To</b> {props.to}
          </span>
          <br />
          <span>
            <CalendarOutlined />
            {moment(props.dateTime).format('MMMM Do YYYY')}
          </span>
          <br />
          <span>
            <CarOutlined /> {props.carModel}
          </span>
          <br />
          <span className='card__price'>
            <DollarOutlined />
            Price {props.price} Baht
          </span>
        </div>
      </div>
      <div className='card__divider'>{/* horizontal line */}</div>
      <div className='card__footer'>
        {props.status}
      </div>
    </div>
  );
}

export default HistoryCard;
