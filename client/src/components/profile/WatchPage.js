import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const WatchPage = ({ watch, profile:{profile}, watchCount }) => {
  const { _id, name, url, description } = watch;
  // document.body.classList.add('blur')

  
  return (
    <div className="view-watch">
      <div>
        <img
          src={url}
          alt="Image of watch"
          style={{ width: "52vh", height: "auto", }}
        />
      </div>
      <div
        style={{ width: "40vh", height: "auto", backgroundColor: "#222222" }}
      >
        <div
          style={{
            width: "33vh",
            height: "auto",
            margin: "auto",
            marginTop: "3vh",
            marginLeft: "4vh",
            marginRight: "4vh",
          }}
        >
          <div style={{ display: "flex", marginBottom: "2vh" }}>
            <img
              src={profile.user && profile.user.avatar}
              style={{
                width: "5vh",
                height: "5vh",
                marginRight: "2vh",
                borderRadius: "90px",
              }}
            ></img>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <p className="text-primary">{profile.user.name}</p>
              <p className="text-secondary">{watchCount} watches</p>
            </div>
            <p></p>
          </div>
          <p
            className="text-primary"
            style={{ textAlign: "left", fontSize: "2rem" }}
          >
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
  profile: PropTypes.object.isRequired,
  watchCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  watchCount: state.profile.profile.watchCount,
});

export default connect(mapStateToProps, {})(WatchPage);
