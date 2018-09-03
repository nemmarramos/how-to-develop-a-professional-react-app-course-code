import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import * as audioActionCreators from 'core/actions/actions-audio'
import FormControl              from '@material-ui/core/FormControl'
import Input                    from '@material-ui/core/Input'
import InputLabel               from '@material-ui/core/InputLabel'
import ClickAwayListener        from '@material-ui/core/ClickAwayListener'
import { styles }               from './styles.scss'

class DetailsTitle extends Component {
  constructor(props) {
    super(props)
    const { title } = props

    this.state = {
      isEditingTitle: false,
      title,
      updatedTitle: title
    }
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.audio.endTitleEdit()
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { editTitle } = nextProps.audio
    const { title } = state
    const isEditingTitle = editTitle

    return { isEditingTitle, title }
  }

  onSubmit = (evt) => {
    if (evt.key === 'Enter') {
      this.handleEditTitle()
    }
  }

  handleEditTitle = () => {
    const { actions, recordingId } = this.props
    const { updatedTitle, title } = this.state

    if ((updatedTitle !== '') && (title !== updatedTitle)) {
      actions.audio.updateTitle(recordingId, updatedTitle)
      this.setState({ title: updatedTitle })
    } else {
      actions.audio.endTitleEdit()
      this.setState({ updatedTitle: title })
    }
  }

  handleClickAway = () => {
    this.handleEditTitle()
  }

  editTitle = (evt) => {
    this.setState({ updatedTitle: evt.target.value })
  }

  renderTitle = () => {
    const { isEditingTitle, title, updatedTitle } = this.state

    if (isEditingTitle) {
      return (
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <FormControl
            className="edit-title-field"
            onKeyPress={this.onSubmit}
          >
            <InputLabel
              className="edit-title-label"
              FormLabelClasses={{
                root: 'edit-title-label',
                focused: 'focused'
              }}
              htmlFor="edit-title-input-container"
            >
              Edit Title
            </InputLabel>
            <Input
              autoFocus
              onChange={this.editTitle}
              className="edit-title-input-container"
              classes={{ underline: 'underline' }}
              id="edit-title-input"
              value={updatedTitle}
            />
          </FormControl>
        </ClickAwayListener>
      )
    }

    return (<span className="audio-title">{title}</span>)
  }

  render() {
    return (
      <div className={styles}>
        <div className="audio-title-container">
          { this.renderTitle() }
        </div>
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

DetailsTitle.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  recordingId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsTitle)
