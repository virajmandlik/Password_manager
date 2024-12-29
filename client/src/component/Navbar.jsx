import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-scroll';
import "./Navbar.css"
const Navbar = () => {
  const [login, setLogin] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkLogin = async () => {
      let val = await axios.get("http://localhost:3001/login");
      setLogin(val.data.login);
    };
    checkLogin();
  }, [login]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">MyApp</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="home" smooth={true} offset={-70} duration={500} className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="about" smooth={true} offset={-70} duration={500} className="nav-link">About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="contact" smooth={true} offset={-70} duration={500} className="nav-link">Contact Us</Link>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
