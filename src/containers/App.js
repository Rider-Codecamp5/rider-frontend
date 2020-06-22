import React from 'react';
import './App.css';
import Navbar from "../components/Navbar";
import DriverRoute from '../components/pages/DriverRoute';
import SearchDriver from '../components/pages/SearchDriver';
import BookingDetail from '../components/pages/BookingDetail';
import DriverOnTheWay from '../components/pages/DriverOnTheWay';

function App() {
  return (
    <div className="App">
      {/* <SearchDriver /> */}
      <BookingDetail />
      {/* <DriverOnTheWay /> */}
      <Navbar />
      {/* <DriverRoute /> */}
    </div>
  );
}

export default App;
