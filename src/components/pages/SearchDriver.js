import React from "react";
import "antd/dist/antd.css";
import {
 Form,Input,Button,DatePicker,TimePicker,Menu,Dropdown,message,Row,Col} from "antd";
import moment from "moment";
import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import "../../styles/SearchDriver.css";
import "../CardSearch";
import CardSearch from "../CardSearch";

function onChange(date, dateString) {
  // console.log(date, dateString);
}

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd item
    </Menu.Item>
  </Menu>
);

function SearchDriver() {
  return (
    <div>
      <div className="marginTop">
        <Row>
          <Col span={22} offset={1} className="colForm">
            <Form.Item label="">
              <Input placeholder="Departing City" />
            </Form.Item>
            <Form.Item label="">
              <Input placeholder="Destination City" />
            </Form.Item>

            <Row>
              <Col span={11} offset={0}>
                <DatePicker onChange={onChange} className="datePicker" />
              </Col>
              <Col span={10} offset={2}>
                <TimePicker
                  onChange={onChange}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                  className="timePicker"
                />
              </Col>
            </Row>

            <Row>
              <Col span={5} offset={8}>
                <Dropdown overlay={menu} className="dropDownList">
                  <Button>
                    Sort by <DownOutlined />
                  </Button>
                </Dropdown>
              </Col>
            </Row>

            <Row>
              <Col span={7} offset={0}>
                <Form.Item>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    className="buttonStyle"
                  >
                    Search
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <CardSearch />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SearchDriver;
