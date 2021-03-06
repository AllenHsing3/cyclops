import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const WatchPage = ({ watch, profile: { profile }, watchCount }) => {
  const { _id, name, url, description } = watch;
  // document.body.classList.add('blur')

  return (
    <div className="view-watch">
      <div>
        <img
          src={url}
          alt="Image of watch"
          style={{
            verticalAlign: "middle",
            width: "40vh",
            height: "auto",
            margin: "auto",
            display: "block",
          }}
        />
      </div>
      <div
        className="watch-page-info"
        style={{  width:"40vh",height: "auto", backgroundColor: "#222222" }}
      >
        <div
          id="watch-page-info"
          style={{
            width: "35vh",
            height: "auto",
            margin: "auto",
            marginTop: "3vh",
            marginLeft: "2.5vh",
          }}
        >
          <div style={{ display: "flex", marginBottom: "2vh" }}>
            <img
              src={profile && profile.user.avatar}
              style={{
                verticalAlign: "middle",
                maxWidth: "5vh",
                height: "5vh",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "1.5vh",
                display: "block",
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
          <div style={{ }}>
            <p
              className="text-primary"
              style={{
                textAlign: "left",
                fontSize: "1.2rem",
                wordWrap: "break-word",
              }}
            >
              {name}
            </p>
            <p className="text-secondary" style={{ textAlign: "left", marginBottom:"2vh" }}>
              {description}
            </p>
          </div>
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
