import React, { PropTypes } from 'react'

import LargeImage, { getLargeSizeImageUrl } from '../../../images/Large'
import styles from './PreviewImage.css'

const PreviewImage = field => {
  // field.src contains the newly selected image to be previewed
  // where field.input.value contains the original image that
  // comes with the asset.

  const src = (
    field.src &&
    field.src !== ''
  )
    ? field.src
    : getLargeSizeImageUrl(field.input.value)

  return (
    <div className={styles.previewContainer}>
      <LargeImage src={src} />
    </div>
  )
}

PreviewImage.propTypes = {
  field: PropTypes.object,
}

export default PreviewImage