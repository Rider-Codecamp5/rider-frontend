import React from 'react';
import '../styles/PassengerProfileCard.css';

function PassengerProfileCard(props) {
  const { Data } = props;

  return (
    <div className='card'>
      <div className='card__content' style={{ paddingBottom: '1rem' }}>
        <div className='card__text' style={{ padding: '0.5rem' }}>
          <span>
            <b>Email:</b> {Data.email}
          </span>
          <span>
            <b>Phone:</b> {Data.phone_number}
          </span>
          <span>
            <b>Address:</b> {Data.address}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PassengerProfileCard;
