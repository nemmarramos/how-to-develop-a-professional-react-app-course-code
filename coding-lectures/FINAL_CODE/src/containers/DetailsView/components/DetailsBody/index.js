import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import ErrorIcon            from '@material-ui/icons/ErrorOutline'
import ProgressIndicator    from 'components/ProgressIndicator'
import { getAudioElem }     from 'core/libs/lib-audio-helpers'
import DetailsControls      from '../DetailsControls'
import DetailsTitle         from '../DetailsTitle'
import DetailsVisualization from '../DetailsVisualization'
import { styles }           from './styles.scss'

class DetailsBody extends Component {
  constructor(props) {
    super(props)
    const { recording } = props

    this.state = {
      audioElem: null,
      recording,
      searching: true
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { recording } = nextProps

    if (recording) {
      const audioElem = getAudioElem(recording)

      return {
        audioElem,
        recording,
        searching: false
      }
    }

    return { recording }
  }

  componentDidMount= () => {
    const self = this

    setTimeout(() => {
      self.setState({
        searching: false
      })
    }, 3000)
  }


  displayBody = () => {
    const { audioElem, recording, searching } = this.state

    if (searching) {
      return (
        <div>
          <div className="scrim" />
          <ProgressIndicator size={60} color="secondary" />
        </div>
      )
    } else if (recording && audioElem) {
      return (
        <div>
          <DetailsControls audioElem={audioElem} />
          <DetailsTitle recordingId={recording.id} title={recording.title} />
          <div className="content-area" />
        </div>
      )
    }

    return (
      <div>
        <div className="scrim" />
        <div className="not-found">
          <span className="msg">Recording not found</span>
          <ErrorIcon />
        </div>
      </div>
    )
  }

  render() {
    const { audioElem } = this.state

    return (
      <div className={styles}>
        <div className="details-body">
          <DetailsVisualization audioElem={audioElem} />
          {this.displayBody()}
        </div>
      </div>
    )
  }
}


DetailsBody.propTypes = {
  recording: PropTypes.shape({})
}

DetailsBody.defaultProps = {
  recording: null
}

export default DetailsBody
