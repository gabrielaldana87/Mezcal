const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const fetchUserBegin = () => ({ type: FETCH_USER_BEGIN });
const fetchUserSuccess = user  => ({ type: FETCH_USER_SUCCESS, payload: user });
const fetchUserFailure = error => ({ type: FETCH_USER_FAILURE, payload: { error }});

export const fetchUser = () => {
  return dispatch => {
    dispatch(fetchUserBegin());
    return fetch('/api/user')
      .then(handleErrors)
      .then( res => res.json() )
      .then( user => {
        dispatch(fetchUserSuccess(user));
        return user;
      })
      .catch( error => dispatch(fetchUserFailure( error )));
  }
};

// Handle HTTP errors since fetch won't.
const handleErrors = res => {
  if ( !res.ok ) {
    throw Error(res.statusText);
  }
  return res;
};