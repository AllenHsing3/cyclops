import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="navbar">
      <li>
        <Link to="/user/dashboard">
          <svg
            width="36"
            height="24"
            viewBox="0 0 36 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#222222"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M29.6232 15C29.3498 16.0646 28.9337 17.0713 28.396 18H7.604C6.58235 16.2355 6 14.1894 6 12C6 9.81062 6.58235 7.76449 7.604 6H28.396C28.9337 6.92871 29.3498 7.93543 29.6232 9H35.7511C35.1766 5.57528 33.6349 2.47848 31.4166 0H4.58336C1.73312 3.18454 0 7.38987 0 12C0 16.6101 1.73312 20.8155 4.58336 24H31.4166C33.6349 21.5215 35.1766 18.4247 35.7511 15H29.6232Z"
              fill="white"
            />
          </svg>
        </Link>
      </li>
      <li>
        <Link to="/user/profiles">
        <i class="fas fa-users fa-2x"></i>
        </Link>
      </li>
      <li className="logout"
      >
        <a href="/" onClick={logout}>
          <i className="fas fa-sign-out-alt fa-2x"></i>{" "}
          <span className="hide-sm"></span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar">
      <li>
        <Link to="/">
          <svg
            width="36"
            height="24"
            viewBox="0 0 36 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#222222"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M29.6232 15C29.3498 16.0646 28.9337 17.0713 28.396 18H7.604C6.58235 16.2355 6 14.1894 6 12C6 9.81062 6.58235 7.76449 7.604 6H28.396C28.9337 6.92871 29.3498 7.93543 29.6232 9H35.7511C35.1766 5.57528 33.6349 2.47848 31.4166 0H4.58336C1.73312 3.18454 0 7.38987 0 12C0 16.6101 1.73312 20.8155 4.58336 24H31.4166C33.6349 21.5215 35.1766 18.4247 35.7511 15H29.6232Z"
              fill="white"
            />
          </svg>
        </Link>
      </li>
      <li>
        <Link to="/user/profiles">
        <i class="fas fa-users fa-2x"></i>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar ">
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
