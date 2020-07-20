import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../styles/LandingPage.css';

const introStyles = {
  padding: '0 2rem 0 2rem',
};

const LandingPage = () => {
  return (
    <div>
      <nav>
        <div className='hamburger'>
          <div className='line' />
          <div className='line' />
          <div className='line' />
        </div>
        <ul className='nav-links'>
          <li>
            <Link to='/'>Rider</Link>
          </li>
          <li>
            <Link to='/'>Policy</Link>
          </li>
          <li>
            <Link to='/login'>Log In</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      </nav>
      <Row>
        <Col span={12}>
          <h1 id='welcome'>Welcome To RIDER</h1>
          <h1 id='motto' className='intro' style={introStyles}>
            Save time (and your sanity)
          </h1>
          <p className='intro' style={introStyles}>
            The band goes on at 8 sharp. You can’t be late for work. (Again.)
            Your time is your money. And tackling traffic or hunting for parking
            is a total pain. So, in seconds, we’ll match you with a driver, help
            you find the quickest bus route, or show you the nearest scooter.
          </p>
          <button
            style={{
              margin: '0 0 0 2rem',
              padding: '1rem',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#1788fb',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
          >
            Create Account
          </button>
        </Col>
        <Col span={12}>
          <div id='img'>
            <img
              src='https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
              alt='driving'
              style={{
                width: '600px',
                margin: '2rem',
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
