import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, bio, avatar },
    watchCount,
  }
}) => {
  return (
    <div className="profile">
      <img
        src={avatar}
        className="round-img"
        alt="avatar"
        style={{
          verticalAlign: "middle",
          maxWidth: "15vh",
          height: "15vh",
          borderRadius: "50%",
          objectFit: "cover",
          margin: "auto",
          display: "block",
        }}
      />
      <div style={{ width: "30vh" }}>
        <p className="text-primary">{name}</p>
        <p className="text-secondary" style={{ fontSize: ".9rem" }}>
          {watchCount === 1 ? watchCount + " watch" : watchCount + " watches"}
        </p>
        <p className="text-secondary">
          {bio.length <= 100 ? bio : bio.slice(0, 100) + "..."}
        </p>
      </div>
      <div>
        <Link to={`/${name}`} className="btn  btn-pill">
          View Profile
        </Link>
      </div>
      {/* <ul>
          {skills.splice(0,4).map((skill, index) => (
              <li key={index} className='text-primary'>
                  <i className='fas fa-check'></i>{skill}
              </li>
          ))}
      </ul> */}
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
