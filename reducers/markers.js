const initialState = []

const markers = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MARKERS':
      return [
        ...action.markers
      ]
    default:
      return state
  }
}

export default markers;
