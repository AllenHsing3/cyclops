import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name:'',
        password: '',
        password2: ''
    })

    const {name, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }) //Allows for all inputs to use one onChange function

    const onSubmit = async e => {
        e.preventDefault()
        if(password !== password2){
            setAlert('Passwords do not match', 'danger')
        } else {
            register({ name, password })
        }
    }

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return ( 
    <Fragment>
            <div className="auth-form">

            <h1 className="large text-primary">Sign Up</h1>
      <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Name" 
          name="name" value={name} 
          onChange={e => onChange(e)}
          required />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-pill" value="Register" />
      </form>
      <p className="text-secondary" style={{marginTop:'10px'}}>
        Already have an account? <Link className="text-primary" to="/login">Sign In</Link>
      </p>
      </div>
</Fragment>
    )
}

Register.prototype = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)