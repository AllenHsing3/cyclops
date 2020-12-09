import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
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
          onClick={function () {
            toggleDisplayForm(true);
          }}
          ref={wrapperRef}
        >
          {displayForm && <EditProfile />}
          <div>
            <img
              src={user && user.avatar}
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
            {user && user.name}
          </p>
          <p className="text-secondary">{user && user.bio}</p>
        </div>
        <div style={{ width: "96vh", alignSelf: "center", textAlign: "left" }}>
          <div
            className="text-primary"
            style={{ marginLeft: "2.4vh",marginBottom:"1vh", borderBottom: "1px solid white" }}
          >
            <button className="unstyleButton">Current</button>
            <span> </span>
            <button className="unstyleButton">Previous</button>
          </div>
        </div>
        {profile !== null ? (
          <div className="profile-container">
            {profile.watchBox.map((watch) => (
              <WatchCard watch={watch} edit={true} />
            ))}

            <BlankCard />
          </div>
        ) : (
          <div className="profile-container">
            <BlankCard />
          </div>
        )}
      </div>
    </Fragment>
  );
};

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
