import types from 'core/types'
import {
  deleteStoredRecording,
  getAllStoredRecordings,
  getStoredRecording,
  storeRecording
} from 'core/libs/lib-cache'

export function startRecording() {
  return {
    type: types.START_RECORDING
  }
}

export function stopRecording(param = { saveRecording: false }) {
  return {
    type: types.STOP_RECORDING,
    saveRecording: param.saveRecording
  }
}

function saveDispatch(recording) {
  return {
    type: types.SAVE_RECORDING,
    recording
  }
}

export function save({ id, recording }) {
  return (dispatch, getState) => {
    const { count } = getState().audio
    const title = `Untitled #${count + 1}`
    const enhancedRecording = Object.assign({ id }, { title }, recording)

    dispatch(saveDispatch(enhancedRecording))
  }
}

function getUserRecordingsDispatch(list) {
  return {
    type: types.GET_USER_RECORDINGS,
    list
  }
}

export function getUserRecordings() {
  return (dispatch) => {
    getAllStoredRecordings().then((list) => {
      const audioList = list.sort((a, b) => b.startTime - a.startTime)

      dispatch(getUserRecordingsDispatch(audioList))
    })
  }
}

export function initTitleEdit() {
  return {
    type: types.INIT_EDIT_TITLE
  }
}

export function endTitleEdit() {
  return {
    type: types.END_EDIT_TITLE
  }
}

function updateTitleDispatch(title, list) {
  return {
    type: types.UPDATE_TITLE,
    title,
    list
  }
}

export function updateTitle(recordingId, title) {
  return (dispatch, getState) => {
    getStoredRecording(recordingId).then((audioItemFromStorage) => {
      const { list } = getState().audio
      const recording = audioItemFromStorage

      recording.title = title

      const updatedList = list.map((item) => {
        if (item.id === recordingId) {
          const updatedItem = item
          updatedItem.title = title
          return updatedItem
        }
        return item
      })

      storeRecording({ id: recordingId, recording })

      dispatch(updateTitleDispatch(title, updatedList))
    })
  }
}


function destroyRecordingDispatch(list) {
  return {
    type: types.DELETE_AUDIO,
    list
  }
}

export function destroy(id) {
  return (dispatch, getState) => {
    const { list } = getState().audio
    const index = list.findIndex(x => x.id === id)

    list.splice(index, 1) // Find audio item from Redux list and delete,

    deleteStoredRecording(id)

    dispatch(destroyRecordingDispatch)
  }
}

export function allowMicrophoneAccess() {
  return {
    type: types.MICROPHONE_ACCESS_GRANTED
  }
}

export function clear() {
  return {
    type: types.CLEAR
  }
}
