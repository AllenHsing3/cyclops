import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  AVATAR_SAVED,
} from './types';

// Get user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');
    // Sort randomly
    function sortFunc(a,b) {
      return 0.5 - Math.random()
    }
    const sortedProfiles = res.data.sort(sortFunc)

    dispatch({
      type: GET_PROFILES,
      payload: sortedProfiles,
    });
  } catch (err) {
    console.error(err.message)
  }
};

// Get profile by name
export const getProfileById = (userName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userName}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Create or update profile
export const createProfile = (formData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    // dispatch(setAlert('Watch added to your box!', 'success'));


  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update watch
export const updateWatch = (formData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile/update', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete watch
export const deleteWatch = (formData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profile/delete', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Tag as previous
export const tagPrevious = (formData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profile/previous', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Delete Account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can not be undone.')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Your account has been been removed'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Upload Photo
export const uploadPhoto = (photo) => {
  return async (dispatch) => {
    try {
      // dispatch(setAlert('Uploading...', 'success'))
      let res = await axios.post('/api/profile/photo')
      const url =
        'https://uploads.slate.host/api/public/41497e50-cb83-46f2-a640-270c070c4c5d';
      let data = new FormData();
      data.append('data', photo);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: res.data
        },
        body: data,
      });
      const photoUrl = await response.json()
      return "https://slate.textile.io" + photoUrl.data.ipfs
    } catch (err) {
      console.error(err.message);
    }
  };
};

// Upload Avatar
export const updateAvatar = (formData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/users/avatar', formData, config);

    dispatch({
      type: AVATAR_SAVED,
      payload: res.data,
    });
    // dispatch(setAlert('Avatar Saved', 'success'));


  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
