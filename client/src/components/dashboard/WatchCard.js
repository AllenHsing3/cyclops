import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const WatchCard = ({ watch }) => {
  const { _id, name, url } = watch;

  return (
    <div>
      <Link to={`/watch/` + _id}>
      <img className='profile-img' src={url} alt="Watch in Box" />
      </Link>
      <p>{name}</p>
    </div>
  );
};

WatchCard.propTypes = {};

export default WatchCard;
