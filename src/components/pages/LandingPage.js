import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LandingPage.css';

const introStyles = {
  padding: '0 2rem 0 2rem',
};

const LandingPage = () => {
  useEffect(() => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }, []);

  return (
    <div className='landing-page'>
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
            <Link to='/privacy-policy'>Policy</Link>
          </li>
          <li>
            <Link to='/login'>Log In</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      </nav>

      <div className='landing'>
        <div className='landing__block1'>
          <h1 className='landing__heading'>Welcome To RIDER</h1>
          <h2 id='motto' className='intro' style={introStyles}>
            Save time (and your sanity)
          </h2>
          <p className='landing__text' style={introStyles}>
            The band goes on at 8 sharp. You can’t be late for work. (Again.)
            Your time is your money. And tackling traffic or hunting for parking
            is a total pain. So, in seconds, we’ll match you with a driver, help
            you find the quickest bus route, or show you the nearest scooter.
          </p>
          <button className='App__button App__button--blue landing__button'>
            Create an Account
          </button>
        </div>

        <div className='landing__block2'>
          <div className='landing___img-box'>
            <img
              src='https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
              alt='driving'
              className='landing__img'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
