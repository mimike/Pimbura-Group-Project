import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './ProfileButton'
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navlist">
        <div className="navbar-left">
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Instagram?
            </NavLink>
          </li>
        </div>
        <div className="navbar-right">
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              <i className="home icon"/>
            </NavLink>
          </li>
          <li>
            <NavLink to="/explor" exact={true} activeClassName="active">
              <i className="compass outline icon"/>
            </NavLink>
          </li>
          <ProfileButton/>
          {/* <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </li> */}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
