import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from "../components/Navbar";
import DriverRoute from '../components/pages/DriverRoute';
import UserRegisterRoute from '../components/pages/UserRegisterRoute';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Route, Switch } from 'react-router-dom';
import PrivacyPolicy from '../components/pages/PrivacyPolicy';
import Login from '../components/pages/LoginUser';
import DriverRegister from '../components/pages/DriverRegister';
import History from '../components/pages/History';
import DriverProfile from '../components/pages/DriverProfile'

import 'antd/dist/antd.css';

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  return (

    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Login isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} setUserInfo={setUserInfo} />
        </Route>

        <Route path="/privacy-policy">
          <PrivacyPolicy />
        </Route>

        <Route path="/register">
          <UserRegisterRoute />
        </Route>

        <Route path="/driver/register">
          <DriverRegister isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} setUserInfo={setUserInfo} />
        </Route>

        <Route path="/driver/route">
          <DriverRoute />
        </Route>

        <Route path="/history">
          <History />
        </Route>

        <Route path="/driver-profile">
          <DriverProfile />
        </Route>
      </Switch>
    </div>

  );
}

export default App;
