import React, { useState, useEffect, useRef } from 'react';
import PrivateRoute from '../components/PrivateRoutes/PrivateRoute';
import Navbar from '../components/Navbar';
import * as storageItem from '../configs/localStorageItems';
import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import '../styles/App.css';

function App() {
  const [role, setRole] = useState(
    localStorage.getItem(storageItem.role) || 'guest'
  );

  const socketRef = useRef();
  socketRef.current = io.connect('/');

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
      <PrivateRoute
        role={role}
        setRole={setRole}
        userInfo={userInfo}
        socketRef={socketRef}
      />
      {role === 'guest' ? null : (
        <Navbar
          role={role}
          onLogOut={onLogOut}
          userInfo={userInfo}
          showDrawer={showDrawer}
        />
      )}

      <Drawer
        title='Menu'
        placement='left'
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ fontSize: '1.2rem' }}
      >
        <p>
          <a href='/trip/on-going'>Current Trip</a>
        </p>
        <p>
          <a href='/history'>Trip History</a>
        </p>
        <p>
          <a href='/profile'>Profile</a>
        </p>
        <p>
          <a href='/settings'>Settings</a>
        </p>
      </Drawer>
    </div>
  );
}

export default App;
