import { createActions } from 'redux-actions'

export const {
  uploadPhoto,
  uploadPhotoSuccess,
  uploadPhotoFailed,
} = createActions({

  /**
   * @param {File} file
   * @returns {Object}
   */
  UPLOAD_PHOTO: file => ({
    file,
  }),
  UPLOAD_PHOTO_SUCCESS: image => ({
    image,
  }),
  UPLOAD_PHOTO_FAILED: errorMessage => ({
    errorMessage,
  }),
})
