import React from "react";
import { Rate } from "antd";

function ShowRate() {
  return (
    <div>
      <Rate allowHalf disabled defaultValue={2} value={4.5} count={5} />
    </div>
  );
}

export default ShowRate;
