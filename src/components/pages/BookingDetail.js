import React from "react";
import { Col, Row, Button, Form } from "antd";
import "../../styles/BookingDetail.css";
import driverPhotoBD from "../../image/photo-1592728036073-d0ae31a18fdc.jpg";
import showRate from "../showRate";

function BookingDetail() {
  return (
    <div className="pageSize">
      <div className="marginTopBD"></div>
      <Row>
        <Col span={9} offset={1} className="colBD">
          <Row>
            <Col span={8} offset={12}>
              <img
                src={driverPhotoBD}
                alt="driverPhoto"
                className="driverPhotoBD"
              ></img>
              <p className="driverName">Ryan Simski</p>
              <showRate />
            </Col>
            <Col span={8} offset={1}>
              <div className="CardBD">
                <span className="informationBD">
                  <ul>
                    <li style={{fontSize: "16px"}}>Sathorn Square</li>
                    <li style={{fontSize: "16px"}}>BTS Morchit</li>
                    <li style={{fontSize: "12px"}}>Friday 13th 17:30</li>
                    <hr />
                    <li style={{fontSize: "12px"}}>Honda Civic/Red</li>
                    <li>
                      <span>2 person</span>
                      <span className="priceBD">Price 300 Baht</span>
                    </li>
                  </ul>
                </span>
              </div>
              <div className="mapApiBD"></div>
              <div className="buttonBD">
                <Form.Item>
                  <Button
                    type="primary"
                    // icon={}
                    className="buttonStyleSendMesBD"
                  >
                    Send Message
                  </Button>
                  <Button
                    type="primary"
                    // icon={}
                    className="buttonStyleJoinTripBD"
                  >
                    Join Trip
                  </Button>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default BookingDetail;
