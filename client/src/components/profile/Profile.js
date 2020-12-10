import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import WatchCard from "../dashboard/WatchCard";
import { getProfileById } from "../../actions/profile";

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.name);
  }, [getProfileById, match.params.name]);
  const [watchSet, toggleWatchSet] = useState({
    current: "text-primary",
    previous: "text-secondary",
    displayPrevious: false,
  });

  const watchSetHelper = (e) => {
    if (e.currentTarget.id == "current") {
      toggleWatchSet({
        current: "text-primary",
        previous: "text-secondary",
        displayPrevious: false,
      });
    }
    if (e.currentTarget.id == "previous") {
      toggleWatchSet({
        current: "text-secondary",
        previous: "text-primary",
        displayPrevious: true,
      });
    }
  };
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
            <div
              style={{ width: "96vh", alignSelf: "center", textAlign: "left" }}
            >
              <div
                style={{
                  marginLeft: "2.4vh",
                  marginBottom: "1vh",
                  borderBottom: "1px solid white",
                }}
              >
                <button
                  id="current"
                  onClick={(e) => watchSetHelper(e)}
                  className="unstyleButton"
                  style={{ fontSize: "1.4rem" }}
                >
                  <p
                    style={{ fontSize: "1.4rem" }}
                    className={watchSet.current}
                  >
                    Current
                  </p>
                </button>
                <button
                  id="previous"
                  onClick={(e) => watchSetHelper(e)}
                  style={{ marginLeft: "1vh" }}
                  className="unstyleButton"
                >
                  <p
                    style={{ fontSize: "1.4rem" }}
                    className={watchSet.previous}
                  >
                    Previous
                  </p>
                </button>
              </div>
            </div>
            {profile !== null ? (
              <div className="profile-container">
                {profile.watchBox.map((watch) =>
                  watch.previous == watchSet.displayPrevious ? (
                    <WatchCard watch={watch} edit={false} />
                  ) : null
                )}
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
