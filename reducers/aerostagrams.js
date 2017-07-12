const initialState = {
  photos: [],
  currentImage: {},
  shownIntroModal: true
}

const aerostagrams = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IMAGE':
      return {
        ...state,
        currentImage: action.image
      }
    case 'SHOWED_MODAL':
      return {
        ...state,
        shownIntroModal: false
      }
    case 'NEW_POST':
      return {
        ...state,
        currentImage: initialState.currentImage,
        photos: [
          ...state.photos,
          action.data
        ]
      }
    case 'RECEIVE_PHOTOS':
      return {
        ...state,
        photos: action.photos
      }
    case 'TOGGLE_LIKE':
      return {
        ...state,
        photos: state.photos.map((photo, i) => (
          photo.id === action.id ? { ...photo, liked: 1 } : photo
        ))
      }
    case 'TOGGLE_FAV':
      return {
        ...state,
        photos: state.photos.map((photo, i) => (
          photo.id === action.id ? { ...photo, faved: 1 } : photo
        ))
      }
    default:
      return state
  }
}

export default aerostagrams;
