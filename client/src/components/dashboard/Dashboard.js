// useEffect needed to use the hooks
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { deleteAccount } from '../../actions/profile';
import WatchCard from './WatchCard';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Add a watch to your box
          </Link>
          <div className="profile-container">
            {profile.watchBox.map((watch) => (
              <WatchCard watch={watch} />
            ))}
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
