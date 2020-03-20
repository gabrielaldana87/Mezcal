const GET_LABELS_BEGIN = 'GET_LABELS_BEGIN';
const GET_LABELS_SUCCESS = 'GET_LABELS_SUCCESS';
const GET_LABELS_FAILURE = 'GET_LABELS_FAILURE';

const getLabelsBegin = () => ({ type: GET_LABELS_BEGIN });
const getLabelsSuccess = labels => ({ type: GET_LABELS_SUCCESS, payload: labels });
const getLabelsFailure = error => ({ type: GET_LABELS_FAILURE, payload: error });

const getLabels = () => {
  return dispatch => {
    dispatch(getLabelsBegin());
    return fetch('/api/labels')
      .then(handleErrors)
      .then(res => res.json() )
      .then(labels => {
        dispatch(getLabelsSuccess(labels));
        return labels;
      })
      .catch( error => dispatch(getLabelsFailure( error )));
  }
};

const handleErrors = res => {
  if ( !res.ok ) {
    throw Error(res.statusText);
  }
  return res;
};

export default getLabels;
