import React, { Component, PropTypes } from 'react'

import env from '../../../../env'

export const addThumbnailSuffix = image => {
  if (image) {
    const imageSeg = image.split('.')

    imageSeg[0] = `${imageSeg[0]}_64_64`

    return imageSeg.join('.')
  }

  return ''
}

export const getThumbnailUrl = image => `${env().IMAGE_HOST}/${addThumbnailSuffix(image)}`

/**
 * - Show thumbnail size image.
 * - If image is not available, show image placeholder
 */
class Thumbnail extends Component {
  state = {
    errored: false,
    src: '',
  }

  componentDidMount = () => {
    const { imgName, src } = this.props

    // if image src is provided, use the src straight ahead.

    this.setState({
      src: src || getThumbnailUrl(imgName),
    })
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.imgName !== this.props.imgName) {
      this.setState({
        src: getThumbnailUrl(nextProps.imgName),
      })
    }
  }

  handleError = evt => {
    this.setState({
      errored: true,
      src: 'http://via.placeholder.com/64x64',
    })
  }

  render () {
    const { src } = this.state

    return (
      <img
        src={src}
        onError={this.handleError}
      />
    )
  }
}

Thumbnail.defaultProps = {
  imgName: '',
}

Thumbnail.propTypes = {
  imgName: PropTypes.string,
  src: PropTypes.string,
}

export default Thumbnail
