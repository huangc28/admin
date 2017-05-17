import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './IdeaSamples.css'
import IdeaSampleReworkModal from '../../components/IdeaSampleReworkModal'
import {
  fetchSamples,
  editIdeaSample,
} from '../../actions/ideaSamples.js'

const sampleDataHeader = [
  {
    title: 'Supplier Name',
  },
  {
    title: 'Product Name',
  },
  {
    title: 'Thumbnail',
  },
  {
    title: 'location',
  },
  {
    title: 'Inventory Level',
  },
  {
    title: 'est. shipping cost',
  },
  {
    title: 'Price',
  },
  {
    title: 'Exterior',
  },
  {
    title: 'Color',
  },
  {
    title: 'Material',
  },
  {
    title: 'Weight',
  },
  {
    title: 'Length',
  },
  {
    title: 'Width',
  },
  {
    title: 'Height',
  },
  {
    title: 'Quality Remark',
  },
  {
    title: 'Quantity Remark',
  },
  {
    title: 'Customer Service Remark',
  },
  {
    title: 'Comment',
  },
  {
    title: 'status',
  },
  {
    title: 'Actions',
  },
]

class IdeaSamples extends Component {
  constructor () {
    super()

    this.state = {
      showModal: false,
      selectedSampleId: null,
    }
  }

  componentDidMount = () => {
    const {
      params: {
        ideaId,
      },
      fetchSamples,
    } = this.props

    // fetch idea related sample
    fetchSamples(ideaId)
  }

  componentWillUnmount = () => {
    this.setState({
      selectedSampleId: null,
    })
  }

  onClose = () => {
    this.setState({
      showModal: false,
    })
  }

  onTouchTapRework = sampleId => {
    this.setState({
      showModal: true,
      selectedSampleId: sampleId,
    })
  }

  onSubmit = comment => {
    const { editIdeaSample } = this.props

    const { selectedSampleId } = this.state

    editIdeaSample({
      id: selectedSampleId,
      comment,
    })
  }

  renderSampleHeaders = (header, index) => (
    <div key={index}>
      <div
        className={styles.headerGrid}
      >
        { header.title }
      </div>
    </div>
  )

  renderSample = sample => {
    const filterList = ['id', 'idea_id', 'deleted_at', 'created_at', 'updated_at']

    return (
      <div>
        {
          Object.keys(sample)
            .filter(sampleKey => !filterList.includes(sampleKey)) // filter out fields that we don't want to display.
            .map((sampleKey, index) => (
              <div
                className={styles.grid}
                key={index}
              >
                {
                  sample[sampleKey]
                }
              </div>
            ))
        }

        {
          this.renderSubmitGrid(sample.id)
        }
      </div>
    )
  }

  renderSubmitGrid = sampleId => (
    <div className={styles.submitGrid}>
      {/* Approve */}
      <RaisedButton
        label="Approve"
        primary
      />

      {/* Rework */}
      <RaisedButton
        label="Rework"
        secondary
        onTouchTap={() => this.onTouchTapRework(sampleId)}
      />
    </div>
  )

  render () {
    const { samples } = this.props

    const {
      showModal,
      selectedSampleId,
    } = this.state

    return (
      <div className={styles.root}>

        {/* Header with data */}
        <div className={styles.samples}>

          {/* Horizontal Headers */}
          <div className={styles.sample}>
            {
              sampleDataHeader.map((header, index) => (
                this.renderSampleHeaders(header, index)
              ))
            }
          </div>

          {
            // filter out the fields that we don't need to display
            samples.map((sample, index) => (
              <div key={index} className={styles.sample}>
                {
                  this.renderSample(sample)
                }
              </div>
            ))
          }
          {/* idea sample rework modal */}
          {
            showModal
              ? (
                <IdeaSampleReworkModal
                  sampleId={selectedSampleId}
                  onSubmit={this.onSubmit}
                  onClose={this.onClose}
                />
              )
              : ''
          }

        </div>
      </div>
    )
  }
}

IdeaSamples.propTypes = {
  editIdeaSample: PropTypes.func,
  fetchSamples: PropTypes.func,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
  samples: PropTypes.array,
}

const mapStateToProps = state => ({
  samples: state.ideaSamples.data,
})

export default connect(mapStateToProps, {
  fetchSamples,
  editIdeaSample,
})(IdeaSamples)
