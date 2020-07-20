import React, { Component } from 'react'
import '../../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { Row, Col, } from 'antd';
export class PrivacyPolicy extends Component {
  render() {
    return (
      <Col>
        <div className="App__heading">
          <Row justify="center" >
              <h2>Privacy Policy</h2>
          </Row>
        </div>
        <Row justify="center" style={{ marginTop: "2rem" }}>
            <div className="route__form">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum odit at incidunt veniam pariatur tempora sit quis culpa odio, quos amet et officiis, molestias voluptate reprehenderit dolorum eos in inventore.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum odit at incidunt veniam pariatur tempora sit quis culpa odio, quos amet et officiis, molestias voluptate reprehenderit dolorum eos in inventore.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum odit at incidunt veniam pariatur tempora sit quis culpa odio, quos amet et officiis, molestias voluptate reprehenderit dolorum eos in inventore.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum odit at incidunt veniam pariatur tempora sit quis culpa odio, quos amet et officiis, molestias voluptate reprehenderit dolorum eos in inventore.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum odit at incidunt veniam pariatur tempora sit quis culpa odio, quos amet et officiis, molestias voluptate reprehenderit dolorum eos in inventore.
              </p>
            </div>
        </Row>
        <Row justify="center">
          <Link to="/"><button className="App__button App__button--red">BACK</button></Link>
        </Row>
      </Col>
    )
  }
}

export default PrivacyPolicy
