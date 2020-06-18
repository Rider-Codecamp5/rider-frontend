import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, DatePicker, TimePicker, Tooltip } from "antd";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import "../../styles/SearchDriver.css";
import "../CardSearch";
import CardSearch from "../CardSearch";

function onChange(date, dateString) {
  // console.log(date, dateString);
}

function SearchDriver() {
  return (
    <div>
      <Form.Item label="">
        <Input placeholder="Departing City" />
      </Form.Item>
      <Form.Item label="">
        <Input placeholder="Destination City" />
      </Form.Item>

      <DatePicker onChange={onChange} />
      <TimePicker
        onChange={onChange}
        defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
      />
      <Form.Item>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </Form.Item>
      <CardSearch />

    </div>
  );
}

export default SearchDriver;
