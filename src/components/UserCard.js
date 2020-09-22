import React from 'react';
import moment from 'moment';
import {
  CalendarOutlined,
  PushpinOutlined,
  TeamOutlined,
  DollarOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import '../styles/HistoryCard.css';

function UserCard(props) {
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
          <h3>
            {props.firstName} {props.lastName}
          </h3>
        </div>
        <div className='card__text'>
          <span>
            <b>From</b> {props.from}
          </span>
          <span>
            <PushpinOutlined /> <b>To</b> {props.to}
          </span>
          <span>
            <CalendarOutlined />{' '}
            {moment(props.dateTime).format('MMMM Do YYYY, HH:mm')}
          </span>
          {props.seat ? (
            <span>
              <TeamOutlined /> {props.seat} persons
            </span>
          ) : null}
          <span>
            <PhoneOutlined /> {props.phoneNumber}
          </span>
          <span className='card__price'>
            <DollarOutlined /> Price {props.price} Baht
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
