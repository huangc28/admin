import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

import styles from './IdeaSamples.css'
import * as ideaSampleStatus from '../../constants/ideaSamples'
import ControllButtonBar from '../../components/ControllButtonBar'
import IdeaSampleReworkModal from '../../components/IdeaSampleReworkModal'
import {
  fetchSamples,
  editIdeaSample,
  deleteIdeaSample,
} from '../../redux/ideaSamples'

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

const statusText = {
  [ideaSampleStatus.IDEA_SAMPLE_PENDING]: 'PENDING',
  [ideaSampleStatus.IDEA_SAMPLE_APPROVE]: 'APPROVE',
  [ideaSampleStatus.IDEA_SAMPLE_DISABLED]: 'DISABLED',
  [ideaSampleStatus.IDEA_SAMPLE_REWORK]: 'REWORK',
  [ideaSampleStatus.IDEA_SAMPLE_CREATED]: 'CREATED',
}

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

  onTouchTapApprove = sampleId => {
    const { editIdeaSample } = this.props

    editIdeaSample({
      id: sampleId,
      status: ideaSampleStatus.IDEA_SAMPLE_APPROVE,
    })
  }

  onTouchTapRework = sampleId => {
    this.setState({
      showModal: true,
      selectedSampleId: sampleId,
    })
  }

  onTouchTapDelete = sampleId => {
    const { deleteIdeaSample } = this.props

    deleteIdeaSample(sampleId)
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
          sample && Object.keys(sample)
            .filter(sampleKey => !filterList.includes(sampleKey)) // filter out fields that we don't want to display.
            .map((sampleKey, index) => (
              <div
                className={styles.grid}
                key={index}
              >
                {
                  sampleKey === 'status'
                    ? statusText[sample[sampleKey]] || ''
                    : sample[sampleKey]
                }
              </div>
            ))
        }

        {
          sample &&
          sample.id &&
          this.renderSubmitGrid(sample.id)
        }
      </div>
    )
  }

  // @TODO show render appropriate buttons according to user permission.
  renderSubmitGrid = sampleId => {
    const {
      params: {
        ideaId,
      },
    } = this.props

    return (
      <div className={styles.submitGrid}>
        {/* Approve */}
        <RaisedButton
          label="Approve"
          primary
          onTouchTap={() => this.onTouchTapApprove(sampleId)}
        />

        {/* Edit */}
        <RaisedButton
          label="Edit"
          primary
          onTouchTap={
            () => browserHistory.push(`/erp/procurement/ideas/${ideaId}/samples/${sampleId}/edit`)
          }
        />

        {/* Rework */}
        <RaisedButton
          label="Rework"
          default
          onTouchTap={() => this.onTouchTapRework(sampleId)}
        />

        {/* Delete */}
        <RaisedButton
          label="Delete"
          secondary
          onTouchTap={() => this.onTouchTapDelete(sampleId)}
        />
      </div>
    )
  }

  render () {
    const {
      samples,
      params: {
        ideaId,
      },
      router: {
        goBack,
      },
    } = this.props

    const {
      showModal,
      selectedSampleId,
    } = this.state

    const createIdeaSampleButton = (
      <RaisedButton
        label="Create"
        default
        onTouchTap={
          () => browserHistory.push(`/erp/procurement/ideas/${ideaId}/samples/create`)
        }
      />
    )

    return (
      <div className={styles.root}>

        <ControllButtonBar
          onBack={() => goBack()}
          rightButton={createIdeaSampleButton}
        />

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

          <div className={styles.sampleList}>
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
          </div>
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
  deleteIdeaSample: PropTypes.func,
  editIdeaSample: PropTypes.func,
  fetchSamples: PropTypes.func,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
  router: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  samples: PropTypes.array,
}

const mapStateToProps = state => ({
  samples: state.ideaSamples.data,
})

export default connect(mapStateToProps, {
  fetchSamples,
  editIdeaSample,
  deleteIdeaSample,
})(IdeaSamples)
