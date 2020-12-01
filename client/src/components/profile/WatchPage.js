import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const WatchPage = ({ watch, user, watchCount }) => {
  const { _id, name, url, description } = watch;
  return (
    <div className="view-watch">
      <img
        src={url}
        alt="Image of watch"
        style={{ maxWidth: "50vh", height: "auto" }}
      />
      <div
        style={{ width: "40vh", height: "auto", backgroundColor: "#222222" }}
      >
        <div
          style={{
            width: "33vh",
            height: "auto",
            margin: "auto",
            marginTop: "3vh",
          }}
        >
          <div style={{ display: "flex",            marginBottom: "2vh" }}>
            <img
              src={user && user.avatar}
              style={{
                width: "5vh",
                height: "5vh",
                marginRight:"2vh",
                borderRadius: "90px",
              }}
            ></img>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="text-primary">{user.name}</p>
              <p className="text-secondary">{watchCount} watches</p>
            </div>
            <p></p>
          </div>
          <p className="text-primary" style={{ textAlign: "left", fontSize:"2rem" }}>
            {name}
          </p>
          <p className="text-secondary" style={{ textAlign: "left" }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

WatchPage.propTypes = {
  user: PropTypes.object.isRequired,
  watchCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  watchCount: state.profile.profile.watchCount,
});

export default connect(mapStateToProps, {})(WatchPage);
