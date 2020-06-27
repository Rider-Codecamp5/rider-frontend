import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import axios from '../configs/axios';


function Navbar(props) {

  const [ isDriver, setIsdriver ] = useState(false);

  const checkIsDriver = async() => {
    try{
    let response = await axios.get(`/driver/registered/${props.userInfo.id}`)
      console.log(response)
      if(response.data) {
        setIsdriver(response.data);
      } 
    } catch(err) {
      setIsdriver(false);
    }
  }

  useEffect(() => {
    checkIsDriver();
  }, [props.role])
  

  const navItems = () => {
    switch(props.role) {
      case 'user':
        return(
          <ul>
            <li>
              <a href='/search-driver'>Search</a>
            </li>
            <li>
              {console.log(isDriver)}
              { (isDriver) ? <a href='/driver/route'>Drive Now</a> : <a href='/history'>History</a> }
            </li>
            <li>
              <a href='#'>Profile</a>
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
              <a href='/'>Login</a>
            </li>
            <li>
              <a href='/register'>Register</a>
            </li>
            <li>
              <a href='/privacy-policy'>Policy</a>
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
