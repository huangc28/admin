import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { translate } from 'react-i18next'

import styles from './ImageUpload.css'

import { uploadPhoto } from '../../redux/photo'

class ImageUpload extends Component {
  state = {
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
        this.props.onSelected(evt.target.result)
      }

      reader.readAsDataURL(evt.target.files[0])
    }
  }

  onImageUpload = () => {
    const { photoFiles } = this.state

    this.props.uploadPhoto(photoFiles[0])
  }

  render () {
    const { translation } = this.props

    return (
      <div>
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
        </div>
      </div>
    )
  }
}

ImageUpload.propTypes = {
  translation: PropTypes.func,
  uploadPhoto: PropTypes.func,
  onSelected: PropTypes.func,
}

export default translate(null, { translateFuncName: 'translation' })(
  connect(null, {
    uploadPhoto,
  })(ImageUpload)
)
