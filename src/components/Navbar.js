import React from "react";
import "../styles/Navbar.css";

function Navbar(props) {


  const navItems = () => {
    switch(props.role) {
      case 'guest': 
        return(
          <ul>
            <li>
              <a href="/">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/privacy-policy">Policy</a>
            </li>
          </ul>
        )
      case 'user':
        return(
          <ul>
            <li>
              <a href="/search-driver">Search</a>
            </li>
            <li>
              <a href="#">Inbox</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href='/' onClick={props.onLogOut}>Log out</a>
            </li>
          </ul>
        )
      default:
        return(
          <ul>
            <li>
              <a href="/">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/privacy-policy">Policy</a>
            </li>
          </ul>
        )
    }
  }


  return (
    <nav className="Navbar">
      {navItems()}
    </nav>
  );
}

export default Navbar;
