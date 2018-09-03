import types from 'core/types'

const initialState = {
  count: 0,
  editTitle: false,
  list: [],
  recording: null,
  isRecording: false,
  microphoneAccessGranted: false,
  saveRecording: false
}

function audioReducer(state = initialState, action) {
  switch (action.type) {
    case types.END_EDIT_TITLE: {
      return Object.assign({}, state, {
        editTitle: false
      })
    }

    case types.GET_USER_RECORDINGS: {
      return Object.assign({}, state, {
        list: action.list,
        count: action.list.length
      })
    }

    case types.INIT_EDIT_TITLE: {
      return Object.assign({}, state, {
        editTitle: true
      })
    }

    case types.SAVE_RECORDING: {
      const newList = state.list.slice()
      newList.splice(0, 0, action.recording)

      return Object.assign({}, state, {
        recording: action.recording,
        list: newList,
        count: state.count + 1
      })
    }

    case types.START_RECORDING: {
      return Object.assign({}, state, {
        isRecording: true
      })
    }

    case types.STOP_RECORDING: {
      return Object.assign({}, state, {
        isRecording: false,
        microphoneAccessGranted: false,
        saveRecording: action.saveRecording
      })
    }

    case types.UPDATE_TITLE: {
      return Object.assign({}, state, {
        editTitle: false,
        title: action.title,
        list: action.list
      })
    }

    case types.MICROPHONE_ACCESS_GRANTED: {
      return Object.assign({}, state, {
        microphoneAccessGranted: true
      })
    }

    case types.CLEAR: {
      return Object.assign({}, state, {
        saveRecording: false
      })
    }

    default:
      return state
  }
}

export default audioReducer
