import React from 'react';
import {  Rate  } from 'antd';

function showRate() {
  return (
    <div>
      <style>@import 'antd/dist/antd.css';</style>
      <div id="container" style="padding: 24px" />
    <script>var mountNode = document.getElementById('container');</script>
    <Rate disabled defaultValue={2} />
    </div>
  )
}

export default showRate;
