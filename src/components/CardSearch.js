import React from "react";
import { Card } from "antd";
import "../styles/CardSearch.css";
import driverPhoto from "../image/photo-1592728036073-d0ae31a18fdc.jpg";

function CardSearch() {
  return (
    <div>
      <div className="Card">
        <span className="driverPhoto">
          <img src={driverPhoto} alt="driverPhoto"></img>
        </span>
        <span className="information">
          <ul>
            <li style={{fontSize: "24px"}}>Ryan Simski</li>
            <li>Sathon Square</li>
            <li>Friday 13th 17:30</li>
            <li><span>Honda Civic</span>
            <span className="seat">Seat 2 person</span></li>
          </ul>
        </span>
      </div>
    </div>
  );
}

export default CardSearch;
