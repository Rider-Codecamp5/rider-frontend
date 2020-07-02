import React from 'react';
import moment from 'moment';
import {
  CarOutlined,
  CalendarOutlined,
  PushpinOutlined,
  TeamOutlined,
  DollarOutlined,
  PhoneOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import '../styles/HistoryCard.css';

function HistoryCard(props) {
  return (
    <div className='card'>
      <div className='card__content'>
        <div className='card__profile'>
          <div className='card__img-box'>
            <img
              src={props.profilePic}
              alt={`${props.firstName} ${props.lastName}`}
              className='card__profile-img'
            />
          </div>
          <h3>{props.firstName} {props.lastName}</h3>
        </div>
        <div className='card__text'>
          <span>
            <b>From</b> {props.from}
          </span>

          <span>
            <PushpinOutlined /> <b>To</b> {props.to}
          </span>

            <span>
              <CalendarOutlined /> {moment(props.dateTime).format('MMMM Do YYYY')}
            </span>

          <div className='card__text--2items'>
            <span style={{paddingRight: '1rem'}}>
              <CarOutlined /> {props.carModel} / {props.carColor}
            </span>
            <span>
              <NumberOutlined /> {props.driverLicense}
            </span>
          </div>

          <span>
            <TeamOutlined /> {props.seat} seats available
          </span>
          <span>
            <PhoneOutlined /> {props.phoneNumber}
          </span>

          <span className='card__price'>
            <DollarOutlined /> Price {props.price} Baht
          </span>
        </div>
      </div>
      <div className='card__divider'>{/* horizontal line */}</div>
      <div className='card__footer'>{props.status}</div>
    </div>
  );
}

export default HistoryCard;
