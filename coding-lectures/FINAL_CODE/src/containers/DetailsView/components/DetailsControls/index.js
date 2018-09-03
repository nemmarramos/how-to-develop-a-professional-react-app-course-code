import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActionCreators  from 'core/actions/actions-ui'
import Button                 from 'components/Button'
import PlayIcon               from '@material-ui/icons/PlayArrow'
import PauseIcon              from '@material-ui/icons/Pause'
import Slide                  from '@material-ui/core/Slide'
import { StandardModal }      from 'components/Modals'
import { styles }             from './styles.scss'

function ModalTransition(props) {
  return <Slide direction="left" {...props} />
}

class DetailsControls extends Component {
  static checkMediaSupport() {
    return navigator.mediaDevices
  }

  constructor(props) {
    super(props)
    const { audioElem } = props

    audioElem.onended = this.stopAudio

    this.state = {
      audioElem: props.audioElem,
      isPlaying: false
    }
  }

  componentWillUnmount() {
    this.stopAudio()
  }

  stopAudio = () => {
    const { audioElem } = this.state

    this.setState({
      isPlaying: false
    })

    if (audioElem) { audioElem.pause() }
  }

  toggleAudio= () => {
    const { actions } = this.props
    const { audioElem, isPlaying } = this.state

    if (audioElem && DetailsControls.checkMediaSupport()) {
      this.setState({
        isPlaying: !isPlaying
      })

      if (isPlaying) {
        audioElem.pause()
      } else {
        audioElem.play()
      }

      return
    }

    actions.ui.openModal({ modalKey: 'cannot-play-audio' })
  }

  render() {
    const { ui } = this.props
    const { isPlaying } = this.state
    const buttonType = isPlaying ? <PauseIcon /> : <PlayIcon />

    return (
      <div className={styles}>
        <Button
          variant="fab"
          className="play-btn"
          color="primary"
          onClick={this.toggleAudio}
        >
          {buttonType}
        </Button>

        {!isPlaying && <div className="scrim" />}

        <StandardModal
          modalKey="cannot-play-audio"
          modalState={ui.modalState}
          TransitionComponent={ModalTransition}
        >
          <p>
            Your browser cannot play the WebM audio format.
            <br />
            Please try using a modern browser like Chrome.
          </p>
        </StandardModal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

DetailsControls.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  audioElem: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsControls)
