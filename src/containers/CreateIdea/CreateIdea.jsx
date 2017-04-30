import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form/immutable'
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
        </div>
      </div>
    )
  }
}

CreateIdea.propTypes = {
  submit: PropTypes.func,
}

export default connect(null, {
  submit,
})(CreateIdea)
