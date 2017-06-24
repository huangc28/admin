import {
  createActions,
  handleActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'

export const {
  uploadPhoto,
  uploadPhotoSuccess,
  uploadPhotoFailed,
  storeImage,
  clearUploadedPhoto,
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

  /**
   * set image name
   *
   * @param {String} image
   */
  STORE_IMAGE: image => ({
    image,
  }),
  CLEAR_UPLOADED_PHOTO: () => ({}),
})

/**
 * Reducer
 */
const INIT_STATE = {
  loading: loadingStatus.EMPTY,
  image: null,
  errorMessage: '',
}

const photoReducer = handleActions({
  [uploadPhoto]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [uploadPhotoSuccess]: (state, action) => ({
    ...state,
    loading: loadingStatus.READY,
    image: action.payload.image,
  }),
  [uploadPhotoFailed]: (state, action) => ({
    ...state,
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
  [storeImage]: (state, action) => ({
    ...state,
    image: action.payload.image,
  }),
  [clearUploadedPhoto]: (state, action) => ({
    ...state,
    image: null,
  }),
}, INIT_STATE)

export default photoReducer