import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import BlankCard from '../dashboard/BlankCard'
import WatchCard from '../dashboard/WatchCard'
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          {/* <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )} */}
                  <div className="main-container">
        <div
          className="bio-container"
        >
          <div>
            <img
              src={profile.user && profile.user.avatar}
              style={{
                verticalAlign: "middle",
                maxWidth: "8vh",
                height: "8vh",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "auto",
                display: "block",
              }}
            ></img>
          </div>
          <p className="text-primary" style={{ marginTop: "1vh" }}>
            {profile.user && profile.user.name}
          </p>
          <p className="text-secondary">{profile.user.bio}</p>
        </div>
        {profile !== null ? (
          <div className="profile-container">
            {profile.watchBox.map((watch) => (
              <WatchCard watch={watch} />
            ))}

            <BlankCard />
          </div>
        ) : (
          <Fragment>
            <BlankCard />
          </Fragment>
        )}
      </div>

        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
