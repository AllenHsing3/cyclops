import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated) {
    return <Redirect to='/user/dashboard' />
  }
  // document.body.style.overflow = "hidden"
    return(
        <section className="landing">
          <div className="landing-inner">
            <div className="buttons">
              <p style={{fontSize:"1.5rem", marginBottom:"1vh"}}>A virtual watch box to keep track of your collection, or to share it with others.</p>
              <Link to="/user/register" className="btn btn-primary btn-pill">Sign Up</Link>
              <Link to="/user/login" className="btn btn-light btn-pill">Login</Link>
            </div>
        </div>
        <div className="landing-inner">
          <div className="main-container" style={{flexDirection:"row"}}>
            <div className="landing-about">
              <ul className='text-primary' style={{fontSize:"2rem"}}>
                <li>-Add your watches into your showcase</li>
                <br/>
                <li>-Customize your profile to be seen by other collectors</li>
              </ul>
            </div>
          <video width="60%" height="auto" autoplay muted loop id="vid">     
          <source src="https://slate.textile.io/ipfs/bafybeibbkvprlad4pu5mmowmentuzl5gxyze44wyu352rpsb3youo3ikmu"></source>         
            </video>
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