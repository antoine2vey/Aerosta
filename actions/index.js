import { db } from '../db';

const receiveMarkers = markers => ({
  type: 'RECEIVE_MARKERS',
  markers
})

const receivePhotos = photos => ({
  type: 'RECEIVE_PHOTOS',
  photos
})

const setImage = image => ({
  type: 'SET_IMAGE',
  image
})

const newPost = data => ({
  type: 'NEW_POST',
  data
})

const _hideModal = () => ({
  type: 'SHOWED_MODAL'
})

const fetchMarkers = () => (dispatch) => {
  db.transaction(tx => {
    tx.executeSql(
      'select * from balloons;',
      [],
      (_, { rows }) => {
        dispatch(receiveMarkers(rows._array));
      }
    )
  })
};

const shouldFetchMarkers = (state) => {
  if (!state.markers.length) {
    return true;
  }

  return false;
};

export const fetchMarkersIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchMarkers(getState())) {
    return dispatch(fetchMarkers());
  }

  return Promise.resolve();
};

const fetchPhotos = () => (dispatch) => {
  db.transaction(tx => {
    tx.executeSql(
      'select * from aerostagram;',
      [],
      (_, { rows }) => {
        dispatch(receivePhotos(rows._array));
      }
    )
  })
};

const shouldFetchPhotos = (state) => {
  if (!state.aerostagrams.photos.length) {
    return true;
  }

  return false;
};

export const fetchPhotosIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPhotos(getState())) {
    return dispatch(fetchPhotos());
  }

  return Promise.resolve();
};

export const setCurrentImage = image => dispatch => {
  return dispatch(setImage(image));
}

export const hideModal = () => dispatch => {
  return dispatch(_hideModal());
}

export const createNew = data => (dispatch, getState) => {
  const { uri, title, description, hashtags } = data;
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO aerostagram (image, description, title, hashtags) VALUES (?, ?, ?, ?);`,
      [uri, description, title, hashtags],
      (_, res) => {
        return dispatch(newPost({
          id: res.insertId,
          image: uri,
          description,
          hashtags,
          title,
          liked: 0,
          faved: 0
        }))
      }
    );
  })
}

export const likePhoto = id => dispatch => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE aerostagram SET liked=1 WHERE id=?;`,
      [id],
      () => dispatch(_toggleLike(id))
    )
  })
}

const _toggleLike = id => ({
  type: 'TOGGLE_LIKE',
  id
})
