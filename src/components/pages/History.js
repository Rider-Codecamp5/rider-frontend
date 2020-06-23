import React, { useState } from 'react';
import './History.css';
import HistoryCard from '../HistoryCard';

function History() {
  const [ currentRole, setCurrentRole ] = useState('passenger');

  const onSelectPassenger = () => {
    setCurrentRole('passenger');
  }

  const onSelectDriver = () => {
    setCurrentRole('driver');
  }

  let passengerActive;
  let driverActive;
  (currentRole === 'passenger') ? passengerActive = 'history__role--active' : passengerActive = '';
  (currentRole === 'driver') ? driverActive = 'history__role--active' : driverActive = '';

  return (
    <div className='history'>
      <div className='App__heading'>
        <h2>Trip  History</h2>
      </div>
      <div className='history__display'>
        <div className='history__role'>
          <div className={`history__role1 ${passengerActive}`} onClick={onSelectPassenger}>Passenger</div>
          <div className={`history__role2 ${driverActive}`} onClick={onSelectDriver}>Driver</div>
        </div>
        <HistoryCard name='Shinzo Abe' from='Siam' to='Silom' dateTime='Friday 55555555' carModel='Tesla T' price='300' result='Deny' />
        <button className='App__button App__button--red'>Back</button>
      </div>
    </div>
  )
}

export default History;