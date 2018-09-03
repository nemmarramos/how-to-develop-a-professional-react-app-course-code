import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import * as audioActionCreators from 'core/actions/actions-audio'
import ReactSimpleTimer         from 'react-simple-timer'
import { styles }               from './styles.scss'

class Timer extends Component {
  constructor(props) {
    super(props)
    const {
      microphoneAccessGranted,
      isRecording,
      saveRecording
    } = props.audio

    this.state = {
      microphoneAccessGranted,
      isRecording,
      saveRecording
    }
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.audio.clear()
  }

  static getDerivedStateFromProps(props) {
    const {
      microphoneAccessGranted,
      isRecording,
      saveRecording
    } = props.audio

    return {
      microphoneAccessGranted,
      isRecording,
      saveRecording
    }
  }

  render() {
    const {
      microphoneAccessGranted,
      isRecording,
      saveRecording
    } = this.state
    let onStatus

    if (microphoneAccessGranted && isRecording) {
      onStatus = true
    } else if (saveRecording) {
      onStatus = true
    } else {
      onStatus = false
    }

    return (
      <div className={styles}>
        <ReactSimpleTimer play={onStatus} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      audio: bindActionCreators(audioActionCreators, dispatch)
    }
  }
}

Timer.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  audio: PropTypes.shape({
    microphoneAccessGranted: PropTypes.bool.isRequired,
    isRecording: PropTypes.bool.isRequired,
    saveRecording: PropTypes.bool.isRequired
  }).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
