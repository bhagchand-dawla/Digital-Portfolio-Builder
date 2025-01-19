import React from "react";
import { Link } from "react-router-dom";
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-bar">
        <h1 className="logo">Digital Portfolio Builder</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/logout">Logout</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
