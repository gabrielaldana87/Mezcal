const initialState = {
  data: {
    _id: null,
    title: null,
    color: 'white',
    lists: []
  },
  loading: false,
  error: null
};

const messages = ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'FETCH_BOARD_BEGIN':
      return {
        ...state,
        loading: true,
        error: null
      }
      ;
  case 'FETCH_BOARD_SUCCESS':
    const { _id, title, color, lists } = action.payload;
     return {
        ...state,
        loading: false,
        data: { _id, title, color, lists }
      }
      ;
  case 'FETCH_BOARD_FAILURE':
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

export default messages;