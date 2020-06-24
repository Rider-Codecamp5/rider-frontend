import React from 'react';
import './App.css';
import Navbar from "../components/Navbar";
import DriverRoute from '../components/pages/DriverRoute';
import SearchDriver from '../components/pages/SearchDriver';
import BookingDetail from '../components/pages/BookingDetail';
import DriverOnTheWay from '../components/pages/DriverOnTheWay';
import DriverMatching from '../components/CardWaitingDriverConfirm';
import WaitingDriverConfirm from '../components/pages/WaitingDriverConfirm';


function App() {
  return (
    <div className="App">
      {/* <SearchDriver /> */}
      {/* <BookingDetail /> */}
      {/* <DriverOnTheWay /> */}
      {/* <DriverMatching /> */}
      <Navbar />
      <WaitingDriverConfirm />
      {/* <DriverRoute /> */}
    </div>
  );
}

export default App;
