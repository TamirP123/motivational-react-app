import React from 'react';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand mt-1 fs-2 p-2" to="/">
          Stay Motivated.
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/motivation">
                Motivation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/self-improvement">
                Self Improvement
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/success-stories">
                Success Stories
              </Link>
            </li>
          </ul>
          {Auth.loggedIn() ? (
            <div className="d-flex align-items-center">
              <Link to="/profile" className="btn btn-outline-light me-2">
                View Profile
              </Link>
              <button
                id="logoutButton"
                className="btn btn-outline-light"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline-light">
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
