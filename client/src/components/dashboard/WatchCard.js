import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import WatchPage from "../profile/WatchPage";

const WatchCard = ({ watch }) => {
  const { _id, name, url } = watch;

  // Open Watch view on click
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [displayForm, toggleDisplayForm] = useState(false);
  const [blur, toggleBlur] = useState("");
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          toggleDisplayForm(false);
          // document.body.style.filter = 'blur(0px)'
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
  return (
    <div
      className="watch-card"
      onClick={function () {
        toggleDisplayForm(true);
      }}
      ref={wrapperRef}
    >
      <img className="profile-img" src={url} alt="Watch in Box" />
      <p className="text-primary" style={{ textAlign: "left", marginTop:"1vh", marginBottom:"2vh" }}>
        {name}
      </p>
      {displayForm && <WatchPage watch={watch} />}
    </div>
  );
};

WatchCard.propTypes = {};

export default WatchCard;
