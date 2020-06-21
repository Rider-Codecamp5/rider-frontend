import React from "react";
import "../styles/Navbar.css";
import { Col, Row } from "antd";

function Navbar() {
  return (
    <div className="Navbar">
      <Row>
        <Col span={20} offset={2}>
          <nav>
            <div className="RowCenter">
              <ul>
                <li>
                  <a href="#">Search</a>
                </li>
                <li>
                  <a href="#">Inbox</a>
                </li>
                <li>
                  <a href="#">Profile</a>
                </li>
              </ul>
            </div>
          </nav>
        </Col>
      </Row>
    </div>
  );
}

export default Navbar;
