import React from "react";
import { Col, Row, Form, Input, Button } from "antd";
import "../../styles/DriverOnTheWay.css";
import driverPhotoDOTW from "../../image/photo-1592728036073-d0ae31a18fdc.jpg";

function DriverOnTheWay() {
  return (
    <div>
      <div className="marginTopDOTW"></div>
      <Row className="rowFormDOTW">
        <Col span={22} offset={1} className="colFormDOTW">
          <Form.Item label="">
            <Input placeholder="Sathorn Square" />
          </Form.Item>
          <Form.Item label="">
            <Input placeholder="BTS Morchit" />
          </Form.Item>

          <Row>
            <Col span={14} offset={0}>
              <div className="driverStatusDOTW">
                <p>Driver is coming</p>
              </div>
            </Col>
            <Col span={3} offset={2}>
              <Form.Item>
                <Button
                  type="primary"
                  danger
                  // icon={}
                  className="buttonStyleDOTW"
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <div className="mapApiDOTW">
            <map-api />
          </div>

          <div className="CardDOTW">
            <span className="driverPhotoDOTW">
              <img src={driverPhotoDOTW} alt="driverPhoto"></img>
            </span>
            <span className="informationDOTW">
              <ul>
                <li style={{ fontSize: "24px" }}>Ryan Simski</li>
                <li>Friday 13th 17:30</li>
                <li>Honda Civic</li>
                <li>
                  <span>Red</span>
                  <span className="seatDOTW">Seat 2 person</span>
                </li>
              </ul>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DriverOnTheWay;
