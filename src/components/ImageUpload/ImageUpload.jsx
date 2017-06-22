import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { translate } from 'react-i18next'

import styles from './ImageUpload.css'
import { uploadPhoto } from '../../redux/photo'
import { getLargeSizeImageUrl } from '../../utils/images'

const renderPreviewImageField = field => {
  const src = field.src || getLargeSizeImageUrl(field.input.value)

  return (
    <div className={styles.fieldContainer}>
      <img className={styles.previewImg} src={src} />
    </div>
  )
}

class ImageUpload extends Component {
  state = {
    previewImage: null,
    photoFiles: [],
  }

  onPhotoChange = evt => {
    evt.persist()

    if (evt.target.files && evt.target.files[0]) {
      this.setState({
        photoFiles: evt.target.files,
      })

      const reader = new FileReader()

      reader.onload = evt => {
        this.setState({
          previewImage: evt.target.result,
        })
      }

      reader.readAsDataURL(evt.target.files[0])
    }
  }

  onRemovePreviewImage = () => {
    this.setState({
      previewImage: null,
      photoFiles: [],
    })
  }

  onImageUpload = () => {
    const { photoFiles } = this.state

    this.props.uploadPhoto(photoFiles[0])
  }

  render () {
    const { previewImage } = this.state

    const { translation } = this.props

    return (
      <div>
        {/* image preview */}
        <Field
          name="image"
          src={previewImage}
          component={renderPreviewImageField}
        />

        <div className={styles.btns}>
          {/* select photo button */}
          <div className={styles.btn}>
            <RaisedButton
              containerElement="label"
              label={translation('Select Photo')}
            >
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={this.onPhotoChange}
              />
            </RaisedButton>
          </div>

          {/* upload photo button */}
          <div className={styles.btn}>
            <RaisedButton
              label={translation('Upload')}
              primary
              onTouchTap={this.onImageUpload}
            />
          </div>

          {/* remove preview button */}
          <div className={styles.btn}>
            <RaisedButton
              label={translation('Remove Preview')}
              secondary
              onTouchTap={this.onRemovePreviewImage}
            />
          </div>
        </div>
      </div>
    )
  }
}

ImageUpload.propTypes = {
  translation: PropTypes.func,
  uploadPhoto: PropTypes.func,
}

export default translate(null, { translateFuncName: 'translation' })(
  connect(null, {
    uploadPhoto,
  })(ImageUpload)
)
