import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { TbGridDots } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import google from '../media/google.jpg';

function Navbar() {
  const handleActive = (nav) => (nav.isActive ? 'active-link' : '');

  return (
    <header className="navbar">
      <div className="brand">
        <NavLink to="/" id="navlink-name">
          <img src={google} alt="google" className="brand-img" id="brand" />
          Translate
        </NavLink>
      </div>
      <ul className="nav-list">
        <li>
          <NavLink to="/settings" className={handleActive} id="navlink">
            <IoSettingsOutline />
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={handleActive} id="navlink">
            <TbGridDots />
          </NavLink>
        </li>
        <li className="my-profile-link">
          <NavLink to="/profile" className={handleActive} id="navlink-profile">
            <CgProfile />
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
