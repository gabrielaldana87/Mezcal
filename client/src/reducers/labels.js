const initialState = {
  data: [],
  loading: false,
  error: null
};

const labels = ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'GET_LABELS_BEGIN':
      return {
        ...state,
        loading: true,
        error: null
      }
    ;
    case 'GET_LABELS_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    ;
  case 'GET_LABELS_FAILURE':
      return {
        ...state,
        loading: false,
        data: { error: 'connection to server failed'}
      }
      ;
  default:
    return state;
  }
};

export default labels;