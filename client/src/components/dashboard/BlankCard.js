import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AddWatch from "../profile-forms/AddWatch";

const BlankCard = () => {
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

  const closeForm = (submitSuccessful) => {
    toggleDisplayForm(submitSuccessful)
  }

  return (
    <div
      className="watch-card"
      onClick={() => toggleDisplayForm(true)}
      ref={wrapperRef}
      style={{width:"31vh", height:"40vh", display:"flex", alignContent:"center"}}
    >
      {displayForm && <AddWatch submitted={closeForm} />}
      <div className='profile-img'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
        >
          <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
        </svg>{" "}
      </div>
    </div>
  );
};

BlankCard.propTypes = {};

export default BlankCard;
