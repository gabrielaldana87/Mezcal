const initialState = {
  data: [{
    _id: null,
    title: null
  }],
  loading: false,
  error: null
};

const status = ( state = initialState, action ) => {
  switch ( action.type ) {
  case 'FETCH_STATUS_BEGIN' :
    return {
      ...state,
      loading: true,
      error: null
    }
    ;
  case 'FETCH_STATUS_SUCCESS' :
    return {
      ...state,
      loading: false,
      data: action.payload
    }
    ;
  case 'FETCH_BOARD_FAILURE' :
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      data: {}
    };
  default:
    return state;
  }
};

export default status;