import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const handleActive = (nav) => (nav.isActive ? 'active-link' : '');

  return (
    <header className="navbar">
      <div className="brand">
        <p className="brand-name">
          Translator
        </p>
      </div>
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={handleActive}>MainPage</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={handleActive}>About</NavLink>
        </li>
        <li className="my-profile-link">
          <NavLink to="/profile" className={handleActive}>My Profile</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
