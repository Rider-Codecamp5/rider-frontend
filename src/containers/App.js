import React from 'react';
import './App.css';
import Navbar from "../components/Navbar";
import DriverRoute from '../components/pages/DriverRoute';
import SearchDriver from '../components/pages/SearchDriver';

function App() {
  return (
    <div className="App">
      <SearchDriver />
      <Navbar />
      {/* <DriverRoute /> */}
    </div>
  );
}

export default App;
