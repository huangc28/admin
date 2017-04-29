import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

import styles from './CreateIdea.css'

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
class CreateIdea extends Component {
  constructor () {
    super()

    this.state = {
      productName: '',
    }
  }

  render () {
    return (
      <div>
        <TextField hintText="Product Name" />

        <TextField hintText="Product Cost" />

        <TextField hintText="Net Weight" />

        <TextField hintText="Approximate Pack Weight" />

        <TextField hintText="Net Weight" />

        <Checkbox
          label="battery"
          labelPosition="left"
          style={styles.checkbox}
        />

        <Checkbox
          label="branded"
          labelPosition="left"
          style={styles.checkbox}
        />

        <Checkbox
          label="fragile"
          labelPosition="left"
          style={styles.checkbox}
        />

        <TextField
          hintText="expected problems / key selling points"
          multiLine
          rows={2}
          rowsMax={4}
        />

        <TextField hintText="Proposer Name" />
      </div>
    )
  }
}

export default CreateIdea
