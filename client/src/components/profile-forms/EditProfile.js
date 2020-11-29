import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveBio } from "../../actions/auth";
import { uploadPhoto, updateAvatar } from "../../actions/profile";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const EditProfile = ({
  user,
  uploadPhoto,
  updateAvatar,
  saveBio,
  profile: { loading },
}) => {
  const [bio, setBio] = useState(user.bio);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveBio(bio);
  };

  const onChange = (e) => {
    setBio(e.target.value);
  };
  //   SET AND SUBMIT PROFILE PHOTO
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (photo === null) {
        //   setMessage('You need to upload a picture first...');
        console.log("A");
        return;
      }
      const regex = RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
      if (photo.size > 8000000) {
        //   setMessage('File is too large! Try something smaller');
        //   setTimeout(messageReset, 3000);
      } else if (!regex.test(photo.name)) {
        //   setMessage('File is not an image...');
      } else if (photo) {
        const photoURL = await uploadPhoto(photo);
        const formData = { url: photoURL };
        formData.url = photoURL;
        await updateAvatar(formData);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleOnChange = async (event) => {
    try {
      const file = event.target.files[0];
      setPhoto(file);
      const photoURL = await uploadPhoto(photo);
      const formData = { url: "" };
      formData.url = photoURL;
      await updateAvatar(formData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="edit-container-open">
      <div>
      <form
        method="post"
        encType="multipart/form-data"
        className="bio-image-form"
        onSubmit={(e) => onSubmit(e)}
      >
        <div>
          <label className="" for="photo">
            <img
              src={user.avatar}
              style={{
                verticalAlign: "middle",
                maxWidth: "30vh",
                height: "30vh",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "auto",
                display: "block",
                marginTop: "10vh",
              }}
            ></img>
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

      </form>
      </div>
      <div className="bio-desc-form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            type="text"
            onChange={(e) => onChange(e)}
            value={bio}
            name="bio"
            style={{width: "30vh",}}
            placeholder="A short desciption of who you are..."
          />
          <div>
          <Button
            variant="contained"
            style={{
              backgroundColor: "grey",
              borderRadius: "90px",
              width: "30vh",

            }}
            type="submit"
          >
            Save
          </Button>
          </div>
        </form>
        </div>
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  saveBio: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile,
});

export default connect(mapStateToProps, { saveBio, uploadPhoto, updateAvatar })(
  EditProfile
);
