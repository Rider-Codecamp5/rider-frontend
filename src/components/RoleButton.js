import React, { useState } from 'react';
import './RoleButton.css'

export default function RoleButton(props) {
  const [ currentRole, setCurrentRole ] = useState('passenger');

  // const { currentRole, setCurrentRole } = props;

  const onSelectPassenger = () => {
    setCurrentRole('passenger');
  }

  const onSelectDriver = () => {
    setCurrentRole('driver');
  }

  let passengerActive;
  let driverActive;
  (currentRole === 'passenger') ? passengerActive = 'role-button--active' : passengerActive = '';
  (currentRole === 'driver') ? driverActive = 'role-button--active' : driverActive = '';

  return (
    <div className='role-button'>
      <div className={`role-button1 ${passengerActive}`} onClick={onSelectPassenger}>Passenger</div>
      <div className={`role-button2 ${driverActive}`} onClick={onSelectDriver}>Driver</div>
    </div>
  )
}
