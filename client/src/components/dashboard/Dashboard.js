// useEffect needed to use the hooks
import React, { useEffect, useState, useRef } from "react";
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

  // Set up bio edit pane on click
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [displayForm, toggleDisplayForm] = useState(false);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          toggleDisplayForm(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return loading && profile == null && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="main-container">
        <div
          className="bio-container"
          onClick={() => toggleDisplayForm(true)}
          ref={wrapperRef}
        >
          {displayForm && <EditProfile />}
          <img
            src={user && user.avatar}
            style={{
              width: "100px",
              margin: "auto",
              display: "block",
              borderRadius: "90px",
            }}
          ></img>
          <p className="">{user && user.name}</p>
          <p>{user.bio}</p>
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
