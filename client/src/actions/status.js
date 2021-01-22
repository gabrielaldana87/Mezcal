const FETCH_STATUS_BEGIN = 'FETCH_STATUS_BEGIN';
const FETCH_STATUS_SUCCESS = 'FETCH_STATUS_SUCCESS';
const FETCH_STATUS_FAILURE = 'FETCH_STATUS_FAILURE';

const fetchStatusBegin = () => ({ type: FETCH_STATUS_BEGIN });
const fetchStatusSuccess = status => ({ type: FETCH_STATUS_SUCCESS, payload: status });
const fetchStatusFailure = error => ({ type: FETCH_STATUS_FAILURE, payload: { error }});

export const fetchStatus = () => {
  return dispatch => {
    dispatch(fetchStatusBegin());
    return fetch('/api/categories')
      .then(handleErrors)
      .then(res => res.json())
      .then(status => {
        dispatch(fetchStatusSuccess(status));
        return status;
      })
      .catch( error => fetchStatusFailure());
  }
};

// Handle HTTP errors since fetch won't.
const handleErrors = res => {
  if ( !res.ok ) {
    throw Error(res.statusText);
  }
  return res;
};

