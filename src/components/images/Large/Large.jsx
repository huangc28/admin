import React, { Component, PropTypes } from 'react'

import styles from './Large.css'
import env from '../../../../env'

export const addLargeImageSuffix = image => {
  if (image) {
    const imageSeg = image.split('.')

    imageSeg[0] = `${imageSeg[0]}_360_360`

    return imageSeg.join('.')
  }

  return ''
}

export const getLargeSizeImageUrl = image => `${env().IMAGE_HOST}/${addLargeImageSuffix(image)}`

/**
 * - Show thumbnail size image.
 * - If image is not available, show image placeholder
 */
class LargeSize extends Component {
  state = {
    errored: false,
    src: '',
  }

  componentDidMount = () => {
    const { imgName, src } = this.props

    // console.log('large size image', src)

    // if image src is provided, use the src straight ahead.
    this.setState({
      src: src || getLargeSizeImageUrl(imgName),
    })
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.imgName !== this.props.imgName) {
      this.setState({
        src: getLargeSizeImageUrl(nextProps.imgName),
      })
    }

    if (nextProps.src !== this.props.src) {
      this.setState({
        src: nextProps.src,
      })
    }
  }

  handleError = evt => {
    this.setState({
      errored: true,
      src: 'http://via.placeholder.com/360x360',
    })
  }

  render () {
    const { src } = this.state

    // console.log('large image src', src)

    return (
      <img
        className={styles.large}
        src={src}
        onError={this.handleError}
      />
    )
  }
}

LargeSize.defaultProps = {
  imgName: '',
}

LargeSize.propTypes = {
  imgName: PropTypes.string,
  src: PropTypes.string,
}

export default LargeSize