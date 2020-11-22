import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, uploadPhoto } from '../../actions/profile';
import { Fragment } from 'react';

const AddWatch = ({ createProfile, uploadPhoto }) => {
  const initialState = {
    name: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [previewImg, setPreviewImg] = useState({
    file: null,
  });

  const { name, description } = formData;

  const [message, setMessage] = useState('');
  function messageReset() {
    setMessage('');
  }
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      if (photo === null) {
        setMessage('You need to upload a picture first...');
        return setTimeout(messageReset, 3000);
      }
      const regex = RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
      if (photo.size > 8000000) {
        setMessage('File is too large! Try something smaller');
        setTimeout(messageReset, 3000);
      } else if (!regex.test(photo.name)) {
        setMessage('File is not an image...');
      } else if (photo) {
        const photoURL = await uploadPhoto(photo);
        formData.url = photoURL
        await createProfile(formData);
      }
    } catch (err) {
      console.error(err.message)
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
        <div >
      <h4 className="text">{message}</h4>
      <h3 className="lead text-primary">Add a watch to your watch box</h3>
      <img className="preview-photo" src={previewImg.file} alt="" />
      <form
        method="post"
        encType="multipart/form-data"
        className="form"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="form-group">
          <label className="btn btn-primary label" for="photo">
            Choose a picture
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
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            placeholder="Every piece has a story! Why did you aquire it? What do you like or dislike about it?"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="dashboard">
          Go Back
        </Link>
      </form>
      </div>
    </Fragment>
  );
};

AddWatch.propTypes = {
  createProfile: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
};

export default connect(null, { createProfile, uploadPhoto })(withRouter(AddWatch));
