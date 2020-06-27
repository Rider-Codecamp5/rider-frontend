import React, { useState, useEffect } from 'react';
import PrivateRoute from '../components/PrivateRoutes/PrivateRoute';
import Navbar from '../components/Navbar';
import * as storageItem from '../configs/localStorageItems';

import jwtDecode from 'jwt-decode';
import 'antd/dist/antd.css';
import '../styles/App.css';

function App() {
  const [role, setRole] = useState(
    localStorage.getItem(storageItem.role) || 'guest'
  );

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
      <PrivateRoute role={role} setRole={setRole} userInfo={userInfo} />
      <Navbar role={role} onLogOut={onLogOut} userInfo={userInfo} />
    </div>
  );
}

export default App;
