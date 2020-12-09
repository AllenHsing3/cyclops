import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import WatchCard from "../dashboard/WatchCard";
import { getProfileById } from "../../actions/profile";

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.name);
  }, [getProfileById, match.params.name]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="main-container">
            <div className="bio-container">
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
                  <WatchCard watch={watch} edit={false} />
                ))}
              </div>
            ) : (
              <Fragment></Fragment>
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
