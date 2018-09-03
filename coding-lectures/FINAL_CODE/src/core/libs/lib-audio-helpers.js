export function getAudioElem(recording) {
  if (recording) {
    const audioBlob = new Blob([recording.blob], { type: 'audio/webm' })
    const audioElem = new Audio()

    audioElem.src = URL.createObjectURL(audioBlob)
    return audioElem
  }

  return null
}
