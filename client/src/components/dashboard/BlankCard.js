import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddWatch from '../profile-forms/AddWatch';



const BlankCard = () => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [displayForm, toggleDisplayForm] = useState(false)
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    toggleDisplayForm(false)
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
    <div onClick={() =>toggleDisplayForm(true)}  ref={wrapperRef}>
        {displayForm && <AddWatch/>}
      <div className='blank-card'>
      </div>
      <p>Add to your watchbox
      </p>
    </div>
  );
};

BlankCard.propTypes = {};

export default BlankCard;