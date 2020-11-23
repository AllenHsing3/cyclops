import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveBio } from "../../actions/auth";
const EditProfile = ({ user, saveBio, profile: { loading } }) => {
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
        return;
      }
      const regex = RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
      if (photo.size > 8000000) {
        //   setMessage('File is too large! Try something smaller');
        //   setTimeout(messageReset, 3000);
      } else if (!regex.test(photo.name)) {
        //   setMessage('File is not an image...');
      } else if (photo) {
        //   const photoURL = await uploadPhoto(photo);
        //   formData.url = photoURL
        //   await createProfile(formData);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    //   setPreviewImg({
    //     file: URL.createObjectURL(file),
    //   });
  };

  return (
    <div className="edit-container-open">
      <form
        method="post"
        encType="multipart/form-data"
        className="form"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="form-group">
          <label className="" for="photo">
            <img
              src={user.avatar}
              style={{
                width: "100px",
                margin: "auto",
                display: "block",
                borderRadius: "90px",
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

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => onChange(e)}
          value={bio}
          name="bio"
          placeholder="A short desciption of who you are..."
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  saveBio: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile,
});

export default connect(mapStateToProps, { saveBio })(EditProfile);
