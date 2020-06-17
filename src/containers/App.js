import React from 'react';
import './App.css';
import Navbar from "../components/Navbar";
import DriverRoute from '../components/pages/DriverRoute';
import UserRegisterRoute from '../components/pages/UserRegisterRoute';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


function App() {
  return (
    <div className="App">
      <Navbar />
      <UserRegisterRoute/>
      {/* <DriverRoute /> */}
    </div>
  );
}

export default App;
