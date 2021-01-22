const initialState = {
  data: null,
  loading: false,
  error: null
};

const goal = ( state = initialState, action ) => {
  switch ( action.type ) {
  case 'FETCH_GOAL_BEGIN':
    return {
      ...state,
      loading: true,
      error: null
    }
    ;
  case 'FETCH_GOAL_SUCCESS':
    const { value } = action.payload;
    return {
      ...state,
      loading: false,
      data: value
    }
    ;
  case 'FETCH_GOAL_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      data: {}
    }
    ;
  case 'FETCH_GOAL_SELECTION_BEGIN':
    return {
      ...state,
      loading: true,
      error: null
    }
    ;
  case 'FETCH_GOAL_SELECTION_SUCCESS':
    const
      { document } = action.payload,
      selection = !document ? {value: null , label: null} :
      { value: document.selectedOption, label: document.selectedOption }
    ;
    return {
      ...state,
      loading: false,
      data: selection
    }
    ;
  case 'FETCH_GOAL_SELECTION_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      data: {}
    }
      ;
  default:
    return state;
  }
};

export default goal;