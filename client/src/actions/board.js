const FETCH_BOARD = 'FETCH_BOARD_BEGIN';
const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS';
const FETCH_BOARD_FAILURE = 'FETCH_BOARD_FAILURE';

export const fetchBoardBegin = () => ({ type : FETCH_BOARD });
export const fetchBoardSuccess = board => ({ type: FETCH_BOARD_SUCCESS, payload: board });
export const fetchBoardFailure = error => ({ type: FETCH_BOARD_FAILURE, payload: { error }});

export const fetchBoard = () => {
  return dispatch => {
    dispatch(fetchBoardBegin());
    return fetch('/api/boards')
      .then(handleErrors)
      .then( res => res.json() )
      .then( board => {
        dispatch(fetchBoardSuccess(board));
        return board;
      })
      .catch( error => dispatch(fetchBoardFailure( error )));
  }
};

// Handle HTTP errors since fetch won't.
const handleErrors = res => {
  if ( !res.ok ) {
    throw Error(res.statusText);
  }
  return res;
};

