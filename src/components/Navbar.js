import React from "react";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <div className="Navbar">
      <nav>
        <div className="">
          <ul>
            <li>
              <a href="#">Search</a>
            </li>
            <li>
              <a href="#">Inbox</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
