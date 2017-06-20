import React, { PropTypes } from 'react'
import { Form, Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

import formStyles from '../../../styles/form.css'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line

const validate = values => {
  const errors = {}

  // name is required
  if (!values.name) {
    errors.name = 'Required'
  }

  if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'email pattern is not matched'
  }

  if (!values.email) {
    errors.email = 'Required'
  }

  return errors
}

const SupplierForm = ({ handleSubmit, onSubmitCallback }) => (
  <Form onSubmit={handleSubmit(onSubmitCallback)}>
    {/* name */}
    <div className={formStyles.fieldContainer}>
      <Field
        name="name"
        hintText="Supplier Name"
        floatingLabelText="Supplier Name"
        fullWidth
        component={TextField}
      />
    </div>

    {/* address */}
    <div className={formStyles.fieldContainer}>
      <Field
        name="address"
        hintText="Address"
        floatingLabelText="Address"
        fullWidth
        component={TextField}
      />
    </div>

    {/* phone */}
    <div className={formStyles.fieldContainer}>
      <Field
        name="phone"
        hintText="Phone"
        floatingLabelText="Phone"
        fullWidth
        component={TextField}
      />
    </div>

    {/* email */}
    <div className={formStyles.fieldContainer}>
      <Field
        name="email"
        hintText="Email"
        floatingLabelText="Email"
        fullWidth
        component={TextField}
      />
    </div>

    {/* web site */}
    <div>
      <Field
        name="website"
        hintText="Web Site"
        floatingLabelText="Web Site"
        fullWidth
        component={TextField}
      />
    </div>
  </Form>
)

SupplierForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmitCallback: PropTypes.func,
}

export default reduxForm({
  form: 'supplierForm',
  validate,
})(SupplierForm)
