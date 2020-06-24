import React, { useState } from 'react';
import './HistoryCard.css';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

function HistoryCard(props) {

  return (
    <div className='card'>
      <div className='card__content'>
        <div className='card__img-box'>
          <img 
            src="https://cdn.mos.cms.futurecdn.net/vJvY6J485ReQFXAgx5DSJ3-650-80.jpg"
            alt="profile-pic"
            className='card__profile-img'
          />
        </div>
        <div className='card__text'>
          <h3>{props.name}</h3>
          <span><b>From</b> {props.from}</span>
          <br/>
          <span><b>To</b> {props.to}</span>
          <br/>
          <span>{props.dateTime}</span>
          <br/>
          <span>{props.carModel}</span>
          <br/>
          <span className='card__price'>Price {props.price} Baht</span>
        </div>
      </div>
      <div className='card__divider'>{/* horizontal line */}</div>
      <div className='card__footer'>
        {(props.result === 'Success') ? <CheckCircleOutlined style={{color: '#33a44a'}} /> : <CloseCircleOutlined style={{color: '#FF425E'}} /> } {props.result}
      </div>
    </div>
  )
}

export default HistoryCard;
