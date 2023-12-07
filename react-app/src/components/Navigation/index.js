import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logoImage from "../../static/Quinn-capstone-favicon.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navigation-container">
      {sessionUser && (
        <div className="nav-list">
          <div className="nav-item">
            <NavLink exact to="/dashboard" className="nav-link">
              <div className="full-logo-box">
                <div className="logo-title">TaskRPG</div>
                <div className="logo-img-box">
                  <img src={logoImage} />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="profile-button-box">
            {isLoaded && (
              <div className="nav-item">
                <ProfileButton user={sessionUser} />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
