import React, { useState } from 'react';

import './App.css';
import Navbar from '../components/Navbar';
import DriverRoute from '../components/pages/DriverRoute';
import UserRegisterRoute from '../components/pages/UserRegisterRoute';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Route, Switch } from 'react-router-dom';
import PrivacyPolicy from '../components/pages/PrivacyPolicy';
import Login from '../components/pages/LoginUser';
import DriverRegister from '../components/pages/DriverRegister';
import UserRoute from '../components/pages/UserRoute';

import 'antd/dist/antd.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  return (
    <Switch>
      <Route exact path='/'>
        <div className='App'>
          <Login />
        </div>
      </Route>

      <Route path='/privacy-policy'>
        <PrivacyPolicy />
      </Route>

      <Route path='/register'>
        <UserRegisterRoute />
      </Route>

      <Route path='/driver/register'>
        <DriverRegister
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      </Route>

      <Route path='/driver/route'>
        <DriverRoute />
      </Route>

      <Route path='/search-driver'>
        <UserRoute />
      </Route>
    </Switch>
  );
}

export default App;
