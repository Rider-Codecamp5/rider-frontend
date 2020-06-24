import React from "react";
import { Row, Col, Form, Button } from "antd";
import "../styles/CardWaitingDriverConfirm.css";
import driverPhotoDM from "../image/photo-1592728036073-d0ae31a18fdc.jpg";

function CardWaitingDriverConfirm() {
  return (
    <div>
      <div className="cardDM">
        <Row>
          <Col span={24} offset={2}>
            <p className="messageDM">Waiting driver confirm</p>
          </Col>
          <Col span={5} offset={4} className="colDM">
            <img
              src={driverPhotoDM}
              alt="driverPhoto"
              className="driverPhotoDM"
            ></img>
            <p className="driverNameDM">Ryan Simski</p>
          </Col>
          <Col span={24} offset={0}>
            <Form.Item>
              <Button type="primary" danger className="buttonStyleDM">
                Cancel Request
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
      {/* <BackgroundGray /> */}
    </div>
  );
}

export default CardWaitingDriverConfirm;
