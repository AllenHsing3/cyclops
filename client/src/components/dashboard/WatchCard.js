import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import WatchPage from "../profile/WatchPage";
import EditWatch from "../profile-forms/EditWatch";

const style = document.createElement("style");
style.innerText = `
#overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
#overlay.hidden {
  display: none;
}

#overlay ~ #root {
  transition: 600ms filter ease-in-out, 800ms opacity ease-out;
  opacity: 1;
}
#overlay:not(.hidden) ~ #root {
  filter: blur(5px) saturate(0.1);
  opacity: 0.2;
}
`;

const Modal = ({ children }) => {
  const element = document.getElementById("overlay");
  if (children) {
    element.classList.remove("hidden");
    return ReactDOM.createPortal(children, element);
  }
  element.classList.add("hidden");
  return null;
};

const WatchCard = ({ watch, edit }) => {
  const [modal, toggleModal] = useState({ modalContent: null });
  const { _id, name, url } = watch;
  document.head.append(style);

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
          // toggleModal({ modalContent: null });
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
    toggleDisplayForm(submitSuccessful);
  };

  return (
    <div style={{ width: "31vh", height: "45vh" }}>
      {displayForm && (
        <div ref={wrapperRef}>
          <EditWatch watch={watch} submitted={closeForm} />
        </div>
      )}
      <div className="watch-card">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height:"40vh"
          }}
        >
          <img
            // className="profile-img"
            style={{
              verticalAlign: "middle",
              maxWidth: "39vh",
              height: "39vh",
              objectFit: "cover",
              display: "block",
            }}
            src={url}
            alt="Watch in Box"
            onClick={function () {
              toggleModal({
                modalContent: (
                  <div onClick={() => toggleModal({ modalContent: null })}>
                    <WatchPage watch={watch} />{" "}
                  </div>
                ),
              });
            }}
          />
        </div>
        <div>
          <p
            className="text-primary"
            style={{
              textAlign: "left",
              marginTop: "1vh",
              marginBottom: "2vh",
              wordWrap: "break-word",
              justifySelf: "flex-end",
            }}
          >
            {name}{" "}
            {edit === true ? (
              <span
                style={{ color: "blue" }}
                onClick={() => toggleDisplayForm(true)}
                ref={wrapperRef}
              >
                <i className="fas fa-edit"></i>
              </span>
            ) : null}
          </p>
        </div>

        <Modal>{modal.modalContent}</Modal>
      </div>
    </div>
  );
};

WatchCard.propTypes = {};

export default WatchCard;
