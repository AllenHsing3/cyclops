import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import logo from "../../img/logo.png";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul style={{ position: "absolute", right: "15px" }}>
      {/* <li>
        <Link to="/profiles">
        Friends
        </Link>
      </li>
      <li>
        <Link to="/posts">
        Forum
        </Link>
      </li> */}
      <li>
        <a href="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm"></span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      {/* <li>
        <Link to="/profiles">
        PlaceholderHere
        </Link>
      </li> */}
      {/* <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li> */}
    </ul>
  );

  return (
    <nav className="navbar ">
      <h1>
        <Link to="/">
          <img style={{width:"10vh", height:"auto", position:"absolute", left:'-2px' }} src={logo}></img>
        </Link>
      </h1>
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
