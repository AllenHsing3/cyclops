import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Mov from './mov.qt'

const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated) {
    return <Redirect to='/user/dashboard' />
  }
  // document.body.style.overflow = "hidden"
    return(
        <section className="landing">
          <div className="landing-inner">
            <div className="buttons" style={{paddingTop:"3vh"}}>
              <Link to="/user/register" className="btn btn-light btn-pill">Sign Up</Link>
              <Link to="/user/login" className="btn btn-light btn-pill">Login</Link>
            </div>
        </div>
        <div className="landing-inner" >

            <div className="landing-about">

              <ul className='text-primary text-about' >
              <li style={{fontSize:"1.5rem", borderBottom:"1px solid white"}}>Cyclops is a virtual home for your watch collection</li>
              <br/>

                <li>Add your watches into your showcase</li>
                <br/>
                <li>Customize your profile to share with other collectors</li>
                <br/>
                <li>Check out other collectors collections and discover their story</li>

              </ul>
            </div>
            <div className="vid-container">
          <video width="100%" height="auto" autoPlay  muted loop id="vid">     
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