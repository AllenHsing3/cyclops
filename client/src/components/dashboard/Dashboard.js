// useEffect needed to use the hooks
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { deleteAccount } from "../../actions/profile";
import WatchCard from "./WatchCard";
import BlankCard from "./BlankCard";
import EditProfile from "../profile-forms/EditProfile";


const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile == null && profile === null? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="main-container">
        <div>
        <img
          src={user.avatar}
          style={{ width: "100px", margin: "auto", display: "block", borderRadius: '90px' }}
        ></img>
        <p className="lead">{user && user.name}</p>
        <p className="">{user.bio}</p>
        </div>
        {profile !== null ? (
          <Fragment>
            {/* <Link to="/create-profile" className="btn btn-primary my-1">
            Add a watch to your box
          </Link> */}
            <div className="profile-container">
              {profile.watchBox.map((watch) => (
                <WatchCard watch={watch} />
              ))}
              <BlankCard />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>Let's add your first watch into your watch box!</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Add a watch
            </Link>
          </Fragment>
        )}
               
      </div>
      <EditProfile />
    </Fragment>
  );
};

// Pull the profile state and other needed props
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
