import React from 'react';
import './App.css';
import Navbar from "../components/Navbar";
import DriverRoute from '../components/pages/DriverRoute';
import UserRegisterRoute from '../components/pages/UserRegisterRoute';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Route, Switch } from 'react-router-dom';
import PrivacyPolicy from '../components/pages/PrivacyPolicy';
import Login from '../components/pages/LoginUser';


function App() {
  return (

    <Switch>
      <Route exact path='/'>
        <div className="App">
          <Login />
          {/* <DriverRoute /> */}
        </div>
      </Route>

      <Route path="/PrivacyPolicy">
        <PrivacyPolicy />
      </Route>

    <Route path="/register">
      <UserRegisterRoute />
    </Route>
    </Switch>
  );
}

export default App;
