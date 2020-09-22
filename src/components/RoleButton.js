import React, { useState } from 'react';
import '../styles/RoleButton.css';

export default function RoleButton(props) {
  const [currentRole, setCurrentRole] = useState('passenger');
  const { setIsPassenger } = props;

  const onSelectPassenger = () => {
    setCurrentRole('passenger');
    setIsPassenger(true);
  };

  const onSelectDriver = () => {
    setCurrentRole('driver');
    setIsPassenger(false);
  };

  let passengerActive;
  let driverActive;
  currentRole === 'passenger'
    ? (passengerActive = 'role-button--active')
    : (passengerActive = '');
  currentRole === 'driver'
    ? (driverActive = 'role-button--active')
    : (driverActive = '');

  return (
    <div className='role-button'>
      <div
        className={`role-button1 ${passengerActive}`}
        onClick={onSelectPassenger}
      >
        Passenger
      </div>
      <div className={`role-button2 ${driverActive}`} onClick={onSelectDriver}>
        Driver
      </div>
    </div>
  );
}
