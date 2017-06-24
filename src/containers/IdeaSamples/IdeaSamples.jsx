import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

import styles from './IdeaSamples.css'
import * as ideaSampleStatus from '../../constants/ideaSamples'
import ControllButtonBar from '../../components/ControllButtonBar'
import IdeaSampleReworkModal from '../../components/IdeaSampleReworkModal'
import IdeaSampleApproveModal from '../../components/IdeaSampleApproveModal'
import Thumbnail from '../../components/images/Thumbnail'
import {
  fetchSamples,
  approveIdeaSample,
  deleteIdeaSample,
} from '../../redux/ideaSamples'
import { createPurchaseOrder } from '../../redux/purchaseOrder'

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
      showReworkModal: false,
      showApproveModal: false,
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

  onCloseReworkModal = () => {
    this.setState({
      showReworkModal: false,
    })
  }

  onCloseApproveModal = () => {
    this.setState({
      showApproveModal: false,
    })
  }

  onTouchTapApprove = sampleId => {
    this.setState({
      showApproveModal: true,
      selectedSampleId: sampleId,
    })
  }

  onTouchTapRework = sampleId => {
    this.setState({
      showReworkModal: true,
      selectedSampleId: sampleId,
    })
  }

  onTouchTapDelete = sampleId => {
    const { deleteIdeaSample } = this.props

    deleteIdeaSample(sampleId)
  }

  onSubmitRework = comment => {
    const { editIdeaSample } = this.props

    const { selectedSampleId } = this.state

    editIdeaSample({
      id: selectedSampleId,
      comment,
    })
  }

  onSubmitApprove = (assignee, quantity) => {
    const { selectedSampleId } = this.state

    const {
      approveIdeaSample,
      createPurchaseOrder,
    } = this.props

    approveIdeaSample(selectedSampleId)

    // create new purchase order
    createPurchaseOrder({
      assigneeUserId: assignee,
      quantity,
      ideaSampleId: selectedSampleId,
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
                  /* eslint-disable */
                  do {
                    if (sampleKey === 'status') { statusText[sample[sampleKey]] || '' }
                    else if (sampleKey === 'image') { <Thumbnail imgName={sample[sampleKey]} />}
                    else { sample[sampleKey] }
                  }
                  /* eslint-enable */
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
      showReworkModal,
      showApproveModal,
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
            showReworkModal
              ? (
                <IdeaSampleReworkModal
                  onSubmit={this.onSubmitRework}
                  onClose={this.onCloseReworkModal}
                />
              )
              : ''
          }

          {/* idea sample approve modal */}
          {
            showApproveModal
              ? (
                <IdeaSampleApproveModal
                  onSubmit={this.onSubmitApprove}
                  onClose={this.onCloseApproveModal}
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
  approveIdeaSample: PropTypes.func,
  createPurchaseOrder: PropTypes.func,
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
  createPurchaseOrder,
  fetchSamples,
  approveIdeaSample,
  deleteIdeaSample,
})(IdeaSamples)
