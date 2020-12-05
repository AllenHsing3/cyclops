import React, { useEffect, useState } from "react";
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
  const [message, setMessage] = useState("Save")

  const handleSubmit = (e) => {
    e.preventDefault();
    saveBio(bio);
  };

  const onChange = (e) => {
    setBio(e.target.value);
  };

   const messageReset = () => {
     setMessage("Save")
   }
  const handleOnChange = async (event) => {
    try {
      const file = event.target.files[0];
      const regex = RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
      if (file.size > 8000000) {
        setMessage("File is too large! Try something smaller");
        setTimeout(messageReset, 3000);
      } else if (!regex.test(file.name)) {
        setMessage("Photo is not an image...");
        setTimeout(messageReset, 3000);
      } else if (file) {
        setMessage("Uploading...")
        setPhoto(file);
        const photoURL = await uploadPhoto(file);
        const formData = { url: photoURL };
        await updateAvatar(formData);
        setMessage("Save")
      }
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
                  marginRight:"2.2vh"
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
      <div >
        <form className="bio-desc-form" onSubmit={(e) => handleSubmit(e)}>
          <div>
          <TextField
            onChange={(e) => onChange(e)}
            value={bio}
            name="bio"
            multiline
            rows={4}
            label="Bio"
            style={{ width: "30vh" }}
            placeholder="A short desciption of who you are..."
            color="primary"
          />
          </div>
          <div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "grey",
                borderRadius: "90px",
                width: "30vh",
                marginTop:'2vh'
              }}
              type="submit"
            >
              {message}
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
