import React, { useState, useEffect, useRef } from 'react';
import PrivateRoute from '../components/PrivateRoutes/PrivateRoute';
import Navbar from '../components/Navbar';
import * as storageItem from '../configs/localStorageItems';

import io from 'socket.io-client';
import { notification } from 'antd';
import jwtDecode from 'jwt-decode';
import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import '../styles/App.css';

function App() {
  const [role, setRole] = useState(
    localStorage.getItem(storageItem.role) || 'guest'
  );

  const socketRef = useRef();

  // AntD drawer
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onLogOut = () => {
    localStorage.removeItem(storageItem.ACCESS_TOKEN);
    localStorage.setItem(storageItem.role, 'guest');
  };

  useEffect(() => {
    // persistState
    let storageRole = localStorage.getItem(storageItem.role);
    if (storageRole) {
      setRole(storageRole);
    } else {
      onLogOut();
    }


    // ------------- AntD notification ------------------
    const openNotification = (message) => {
      notification.open({
        message: 'Here Comes a New Passenger',
        description: message,
      });
    };
    socketRef.current = io.connect('/');
    socketRef.current.on('gotPassenger', message => {
      openNotification('You got selected by a passenger!')
    });

  }, []);

  let token = localStorage.getItem(storageItem.ACCESS_TOKEN);
  let userInfo;

  if (token) {
    userInfo = jwtDecode(token);
  } else {
    onLogOut();
  }

  return (
    <div className='App'>
      <PrivateRoute role={role} setRole={setRole} userInfo={userInfo} />
      <Navbar role={role} onLogOut={onLogOut} userInfo={userInfo} showDrawer={showDrawer} />
      <Drawer
        title='Menu'
        placement='left'
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{fontSize: '1.2rem'}}
      >
        <p><a href='/trip/on-going'>Current Trip</a></p>
        <p><a href='/history'>Trip History</a></p>
        <p><a href='/profile'>Profile</a></p>
        <p><a href='/settings'>Settings</a></p>
      </Drawer>
    </div>
  );
}

export default App;
