import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/my-events" className="nav-link">My Events</Link>
        <Link to="/city-selection" className="nav-link">City</Link>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
