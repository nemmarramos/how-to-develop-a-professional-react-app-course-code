import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import * as audioActionCreators from 'core/actions/actions-audio'
import * as uiActionCreators    from 'core/actions/actions-ui'
import { getCurrentId }         from 'core/libs/lib-url-helpers'
import AppBar                   from 'components/AppBar'
import { ConfirmationModal }    from 'components/Modals'
import Toolbar                  from '@material-ui/core/Toolbar'
import IconButton               from '@material-ui/core/IconButton'
import ArrowBackIcon            from '@material-ui/icons/ArrowBack'
import CloseIcon                from '@material-ui/icons/Close'
import EditIcon                 from '@material-ui/icons/Edit'
import DeleteIcon               from '@material-ui/icons/Delete'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { withRouter }           from 'react-router-dom'
import { styles }               from './styles.scss'

class DetailsHeader extends Component {
  close = () => {
    const { actions, history } = this.props

    actions.ui.closeRightDrawer()

    setTimeout(() => {
      history.push('/recordings')
    }, 50)
  }

  confirmDeleteRecording = () => {
    const { actions } = this.props
    actions.ui.openConfirmModal({ modalKey: 'confirm-delete-modal' })
  }

  deleteRecording = () => {
    const { actions } = this.props
    const recordingId = getCurrentId(this.props)

    actions.audio.destroy(recordingId)

    this.close()
  }

  editTitle = () => {
    const { actions } = this.props
    actions.audio.initTitleEdit()
  }

  render() {
    const {
      audio,
      recording,
      ui,
      width
    } = this.props
    const isDisabled = recording === null ? 'is-disabled' : 'is-not-disabled'

    return (
      <div className={styles}>
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="back-arrow"
              className="back-arrow"
              onClick={this.close}
            >
              { isWidthUp('md', width) ? <CloseIcon /> : <ArrowBackIcon /> }
            </IconButton>
            <div className={`sub-nav ${isDisabled}`}>
              <IconButton
                color="inherit"
                aria-label="edit-icon"
                disabled={audio.editTitle}
                onClick={this.editTitle}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="delete-icon"
                onClick={this.confirmDeleteRecording}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <ConfirmationModal
          modalKey="confirm-delete-modal"
          confirmModalState={ui.confirmModalState}
          okCallback={this.deleteRecording}
          title="Delete recording?"
        />

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio,
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      audio: bindActionCreators(audioActionCreators, dispatch),
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

DetailsHeader.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  audio: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  recording: PropTypes.shape({}),
  ui: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
}

DetailsHeader.defaultProps = {
  recording: null
}

export default withWidth()(withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsHeader)))
