/**
 * Generate the image url for:
 *
 *  1. Full size image.
 *  2. Large size image.
 *  3. Thumbnail.
 */
import env from '../../env'

export const addLargeImageSuffix = image => {
  if (image) {
    const imageSeg = image.split('.')

    imageSeg[0] = `${imageSeg[0]}_360_360`

    return imageSeg.join('.')
  }

  return ''
}

export const addThumbnailSuffix = image => {
  if (image) {
    const imageSeg = image.split('.')

    imageSeg[0] = `${imageSeg[0]}_64_64`

    return imageSeg.join('.')
  }

  return ''
}

/**
 * @param {String} image
 * @returns {String} image
 */
export const getFullSizeImageUrl = image => `${env().IMAGE_HOST}/${image}`
export const getLargeSizeImageUrl = image => `${env().IMAGE_HOST}/${addLargeImageSuffix(image)}`
export const getThumbnailUrl = image => `${env().IMAGE_HOST}/${addThumbnailSuffix(image)}`
