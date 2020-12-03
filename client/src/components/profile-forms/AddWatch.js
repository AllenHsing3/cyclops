import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createProfile, uploadPhoto } from "../../actions/profile";
import { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const AddWatch = ({ createProfile, uploadPhoto }) => {
  const initialState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [previewImg, setPreviewImg] = useState({
    file: null,
  });

  const { name, description } = formData;

  const [message, setMessage] = useState("");
  function messageReset() {
    setMessage("");
  }
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (photo === null) {
        setMessage("You need to upload a picture first...");
        return setTimeout(messageReset, 3000);
      }
      const regex = RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
      if (photo.size > 8000000) {
        setMessage("File is too large! Try something smaller");
        setTimeout(messageReset, 3000);
      } else if (!regex.test(photo.name)) {
        setMessage("File is not an image...");
      } else if (photo) {
        const photoURL = await uploadPhoto(photo);
        formData.url = photoURL;
        await createProfile(formData);
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
                    backgroundColor: "black",
                  }}
                />
              </label>
              <div>
                <input
                  id="photo"
                  type="file"
                  name="photo"
                  onChange={handleOnChange}
                  required
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
                placeholder="Every piece has a story! Why did you aquire it? What do you like or dislike about it?"
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
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

AddWatch.propTypes = {
  createProfile: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
};

export default connect(null, { createProfile, uploadPhoto })(
  withRouter(AddWatch)
);
