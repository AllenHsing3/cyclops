import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { updateWatch, uploadPhoto, deleteWatch } from "../../actions/profile";
import { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const AddWatch = ({ updateWatch, uploadPhoto, submitted, watch, deleteWatch }) => {

  const initialState = {
    name: watch.name,
    description: watch.description,
    url: watch.url,
    watchId: watch._id
  };
  const [formData, setFormData] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [previewImg, setPreviewImg] = useState({
    file: watch.url,
  });

  const { name, description } = formData;

  const [message, setMessage] = useState("Save");
  function messageReset() {
    setMessage("Save");
  }
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {

      if (photo === null) {
        updateWatch(formData)
        return submitted(false)
      }
      const regex = RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
      if (photo.size > 8000000) {
        setMessage("File is too large! Try something smaller");
        setTimeout(messageReset, 3000);
      } else if (!regex.test(photo.name)) {
        setMessage("File is not an image...");
        setTimeout(messageReset, 3000);
      } else if (photo) {
        setMessage("Uploading...")
        const photoURL = await uploadPhoto(photo);
        formData.url = photoURL;
        await updateWatch(formData);
        submitted(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    setPreviewImg({
      file: URL.createObjectURL(file),
    });
  };

  const onDelete = () => {
    deleteWatch(formData)
    return submitted(false)
}

  return (
    <Fragment>
      <div className="edit-container-open">
        <div className="add-watch-form">
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={(e) => onSubmit(e)}
          >
            <div>
              <label for="photo">
                <img
                  src={previewImg.file}
                  alt=""
                  style={{
                    verticalAlign: "middle",
                    maxWidth: "25vh",
                    height: "25vh",
                    borderRadius: "50%",
                    marginLeft: "2vh",
                    objectFit: "cover",
                    backgroundColor: "white",
                  }}
                />
              </label>
              <div>
                <input
                  id="photo"
                  type="file"
                  name="photo"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div>
              <TextField
                type="text"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                required
                rows={2}
                style={{ width: "30vh", marginBottom: "3vh" }}
                label="Watch Name"
              />
            </div>
            <div>
              <TextField
                multiline
                rows={3}
                style={{ width: "30vh" }}
                type="text"
                placeholder=""
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
                label="Story"
              />
            </div>
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "grey",
                  borderRadius: "90px",
                  width: "30vh",
                  marginTop: "2vh",
                }}
                type="submit"
              >
                {message}
              </Button>
            </div>
          </form>
          <div style={{}}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "red",
                  borderRadius: "90px",
                  width: "30vh",
                  marginTop: "2vh",
                }}
                onClick={() => onDelete()}
              >
                Remove from your watch box
              </Button>
            </div>
        </div>
      </div>
    </Fragment>
  );
};

AddWatch.propTypes = {
  updateWatch: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
  deleteWatch: PropTypes.func.isRequired,
};

export default connect(null, { updateWatch, uploadPhoto, deleteWatch })(
  withRouter(AddWatch)
);
