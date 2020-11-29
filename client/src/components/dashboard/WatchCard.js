import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const WatchCard = ({ watch }) => {
  const { _id, name, url } = watch;

  return (
    <div className="watch-card">
      <Link to={`/watch/` + _id}>
      <img className='profile-img' src={url} alt="Watch in Box" />
      </Link>
      <p className="text-primary" style={{textAlign:"left"}}>{name}</p>
    </div>
  );
};

WatchCard.propTypes = {};

export default WatchCard;
