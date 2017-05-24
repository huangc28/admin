import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Checkbox,
  TextField,
} from 'redux-form-material-ui'
import { translate } from 'react-i18next'

import styles from './IdeaForm.css'
import { getIdea } from '../../../actions/ideas'
import { uploadPhoto } from '../../../actions/photo'
import { getLargeSizeImageUrl } from '../../../utils/images.js'

/**
 * @param {Object} values
 * @returns {Object} errors
 *
 */
const validate = values => {
  const errors = {}

  // productName is requried
  if (!values.productName) {
    errors.productName = 'Required'
  }

  // netWeight, width, height, length should be float.
  const requireFloat = [
    'netWeight',
    'width',
    'height',
    'length',
  ]

  requireFloat.forEach(field => {
    if (!/\d+(\.\d+)?/.test(values[field])) {
      errors[field] = 'number required'
    }
  })

  return errors
}

const renderPreviewImageField = field => {
  const src = field.src || getLargeSizeImageUrl(field.input.value)

  return (
    <div className={styles.fieldContainer}>
      <img className={styles.previewImg} src={src} />
    </div>
  )
}

/**
 * product name - string
 * image - string
 * product cost
 * net weight
 * approx pack weight
 * battery
 * branded
 * fragile
 * expected problems / key selling point
 * editor / creator
 */
class IdeaForm extends Component {
  constructor () {
    super()

    this.state = {
      previewImage: null,
      photoFiles: [],
    }
  }

  componentDidMount = () => {
    const {
      getIdea,
      refId,
    } = this.props

    if (refId) {
      getIdea(refId)
    }
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
    const {
      handleSubmit,
      onSubmitCallback,
      disabled,
      translation,
    } = this.props

    const {
      previewImage,
    } = this.state

    return (
      <Form
        className={styles.form}
        onSubmit={handleSubmit(onSubmitCallback)}
      >
        <div className={styles.fieldContainer}>
          <Field
            name="productName"
            hintText={translation('Product Name')}
            floatingLabelText={translation('Product Name')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        {/* image preview */}
        <Field
          name="image"
          src={previewImage}
          component={renderPreviewImageField}
        />

        <div className={styles.imgFieldContainer}>
          {/* select photo button */}
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

          {/* upload photo button */}
          <RaisedButton
            label={translation('Upload')}
            primary
            onTouchTap={this.onImageUpload}
          />

          {/* remove preview button */}
          <RaisedButton
            label={translation('Remove Preview')}
            secondary
            onTouchTap={this.onRemovePreviewImage}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="proposerName"
            hintText={translation('Proposer Name')}
            floatingLabelText={translation('Proposer Name')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="netWeight"
            hintText={translation('Net Weight')}
            floatingLabelText={translation('Net Weight')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="approximatePackWeight"
            hintText={translation('Approxmiate Pack Weight')}
            floatingLabelText={translation('Approxmiate Pack Weight')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="productCost"
            hintText={translation('Product Cost')}
            floatingLabelText={translation('Product Cost')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="battery"
            label={translation('Battery')}
            labelPosition="right"
            disabled={disabled}
            component={Checkbox}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="branded"
            label={translation('Branded')}
            labelPosition="right"
            disabled={disabled}
            component={Checkbox}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="fragile"
            label={translation('Fragile')}
            labelPosition="right"
            disabled={disabled}
            component={Checkbox}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="color"
            hintText={translation('Color')}
            floatingLabelText={translation('Color')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="width"
            hintText={translation('Width')}
            floatingLabelText={translation('Width')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="height"
            hintText={translation('Height')}
            floatingLabelText={translation('Height')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="length"
            hintText={translation('Length')}
            floatingLabelText={translation('Length')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="accessories"
            hintText={translation('Accessories')}
            floatingLabelText={translation('Accessories')}
            multiLine
            rows={2}
            rowsMax={4}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="remark"
            hintText={translation('Remark')}
            floatingLabelText={translation('Remark')}
            multiLine
            rows={2}
            rowsMax={4}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>
      </Form>
    )
  }
}

IdeaForm.propTypes = {
  disabled: PropTypes.bool,

  /**
   * Load idea data.
   * use the data to reinitialize form.
   */
  getIdea: PropTypes.func,

  handleSubmit: PropTypes.func,

  initialValues: PropTypes.shape({
    image: PropTypes.string,
  }),

  /**
   * Use refId to load existing idea data.
   */
  refId: PropTypes.number,
  reset: PropTypes.func,

  /**
   * Specify the status of this idea.
   * so we know that which stage this idea is currently at.
   */
  status: PropTypes.number,

  translation: PropTypes.func,

  uploadPhoto: PropTypes.func,

  /**
   * We have to name this function this way,
   * "onSubmit" conflicts with redux-form native function name.
   */
  onSubmitCallback: PropTypes.func,

}

const mapStateToProps = state => ({
  initialValues: state.initFormData.formData,
})

export default translate(null, { translateFuncName: 'translation' })(
  connect(mapStateToProps, {
    getIdea,
    uploadPhoto,
  })(
    reduxForm({
      form: 'ideaForm',
      enableReinitialize: true,
      validate,
    })(IdeaForm)
  )
)
