import React from 'react';

function DriverProfileCard(props) {
  const { Data } = props;

  return (
    <div>
      <div className='card'>
        <div className='card__content' style={{ paddingBottom: '1rem' }}>
          <div className='card__text' style={{ padding: '0.5rem' }}>
            {/* <h3>{props.email}</h3> */}
            <span>
              <b>Driver License :</b> {Data.driver_license}
            </span>
            <span>
              <b>Car Model :</b> {Data.car_model}
            </span>
            <span>
              <b>Car Color :</b> {Data.car_color}
            </span>
            <span>
              <b>Seating Capacity :</b> {Data.seat}
            </span>
            <span>
              <b>Bank Account:</b> {Data.bank_account}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfileCard;
