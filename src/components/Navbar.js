import React from 'react';
import '../styles/Navbar.css';

function Navbar(props) {
  const navItems = () => {
    switch (props.role) {
      case 'user':
        try {
          return (
            <ul>
              <li>
                <a href='/search-driver'>Search</a>
              </li>
              <li onClick={props.showDrawer}>
                <a href='#'>{props.userInfo.name}</a>
              </li>
              <li>
                <a href='/' onClick={props.onLogOut}>
                  Log out
                </a>
              </li>
            </ul>
          );
        } catch (err) {
          props.onLogOut();
        }
        break;
      case 'driver':
        try {
          return (
            <ul>
              <li>
                <a href='/search-driver'>Search</a>
              </li>
              <li>
                <a href='/driver/route'>Drive Now</a>
              </li>
              <li onClick={props.showDrawer}>
                <a href='#'>{props.userInfo.name}</a>
              </li>
              <li>
                <a href='/' onClick={props.onLogOut}>
                  Log out
                </a>
              </li>
            </ul>
          );
        } catch (err) {
          props.onLogOut();
        }
        break;
      default:
        return (
          <ul>
            <li>
              <a href='/'>Login</a>
            </li>
            <li>
              <a href='/register'>Register</a>
            </li>
            <li>
              <a href='/privacy-policy'>Policy</a>
            </li>
          </ul>
        );
    }
  };

  return <nav className='Navbar'>{navItems()}</nav>;
}

export default Navbar;
