export function getCurrentId(props) {
  const { pathname } = props.location
  return pathname.split('/')[2]
}

export function getCurrentPublishedId(props) {
  const { pathname } = props.location
  return {
    userId: pathname.split('/')[2],
    recordingId: pathname.split('/')[4]
  }
}
