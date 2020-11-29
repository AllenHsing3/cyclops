import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import TextField from "@material-ui/core/TextField";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const { name, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    login(name, password);
  };

  // To redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="auth">
        <div className="landing-inner">
          <div style={{ marginBottom: "20vh" }}>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"></p>
            <form
              className="form"
              action="create-profile.html"
              onSubmit={(e) => onSubmit(e)}
            >
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Username"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <input type="submit" className="btn  btn-pill" value="Login" />
            </form>
            <p className="text-secondary" style={{ marginTop: "10px" }}>
              Don't have have an account?{" "}
              <Link className="text-primary" to="/register">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
