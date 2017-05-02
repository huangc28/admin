import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { submit, reset } from 'redux-form/immutable'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './CreateIdea.css'
import IdeaForm from '../../components/forms/IdeaForm'

class CreateIdea extends Component {
  onSubmit = values => {
    console.log('BRYAN: CREATEIDEA', values)
  }

  render () {
    const {
      submit,
      reset,
    } = this.props

    return (
      <div>
        <IdeaForm onSubmitCallback={this.onSubmit} />
        <div className={styles.btns}>
          <div>
            <RaisedButton
              label="submit"
              type="submit"
              onTouchTap={() => submit('ideaForm')}
              primary
            />
          </div>
          <div>
            <RaisedButton
              label="reset"
              type="button"
              onTouchTap={() => reset('ideaForm')}
              default
            />
          </div>
        </div>
      </div>
    )
  }
}

CreateIdea.propTypes = {
  reset: PropTypes.func,
  submit: PropTypes.func,
}

export default connect(null, {
  submit,
  reset,
})(CreateIdea)
