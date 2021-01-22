const FETCH_GOAL_BEGIN = 'FETCH_GOAL_BEGIN';
const FETCH_GOAL_SUCCESS = 'FETCH_GOAL_SUCCESS';
const FETCH_GOAL_FAILURE = 'FETCH_GOAL_FAILURE';

const FETCH_GOAL_SELECTION_BEGIN = 'FETCH_GOAL_SELECTION_BEGIN';
const FETCH_GOAL_SELECTION_SUCCESS = 'FETCH_GOAL_SELECTION_SUCCESS';
const FETCH_GOAL_SELECTION_FAILURE = 'FETCH_GOAL_SELECTION_FAILURE';

const fetchGoalBegin = () => ({ type: FETCH_GOAL_BEGIN });
const fetchGoalSuccess = status => ({ type: FETCH_GOAL_SUCCESS, payload: status });
const fetchGoalFailure = error => ({ type: FETCH_GOAL_FAILURE, payload: { error }});

const fetchGoalSelectionBegin = () => ({ type: FETCH_GOAL_SELECTION_BEGIN });
const fetchGoalSelectionSuccess = status => ({ type: FETCH_GOAL_SELECTION_SUCCESS, payload: status });
const fetchGoalSelectionFailure = error => ({ type: FETCH_GOAL_SELECTION_FAILURE, payload: { error }});

export const fetchGoal = goalOption => {
  return dispatch => {
    dispatch(fetchGoalBegin());
    return fetch('/api/goals', {
      method: 'POST',
      body: JSON.stringify( goalOption ),
      headers: { 'Content-Type' : 'application/json' }
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(goal => {
      dispatch(fetchGoalSuccess(goal));
      return goal;
    })
    .catch( error => fetchGoalFailure());
  }
};

export const fetchGoalSelection = msgId => {
  return dispatch => {
    dispatch(fetchGoalSelectionBegin());
    return fetch(`/api/goals/${ msgId }`)
      .then(handleErrors)
      .then(res => res.json())
      .then(goal => {
        dispatch(fetchGoalSelectionSuccess(goal));
        return goal;
      })
     .catch( error => fetchGoalSelectionFailure());
  }
};

// Handle HTTP errors since fetch won't.
const handleErrors = res => {
  if ( !res.ok ) {
    throw Error(res.statusText);
  }
  return res;
};