import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  // document.body.style.overflow = "hidden"
    return(
        <section className="landing">
          <div className="landing-inner">
            <div className="buttons">
              <Link to="/register" className="btn btn-primary btn-pill">Sign Up</Link>
              <Link to="/login" className="btn btn-light btn-pill">Login</Link>
            </div>
        </div>
      </section>  
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps) (Landing)