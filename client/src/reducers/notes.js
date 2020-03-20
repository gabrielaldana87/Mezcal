const initialState = {
  data: [],
  loading: false,
  error: null
};

const notes = ( state = initialState, action ) => {
  switch (action.type) {
  case 'GET_ALL_NOTES_BEGIN':
    return {
      ...state,
      loading: true,
      error: null
    }
    ;
  case 'GET_ALL_NOTES_SUCCESS':
    const allNotes = action.payload;
    return {
      ...state,
      loading: false,
      data: allNotes
    }
    ;
  case 'GET_ALL_NOTES_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      data: []
    }
    ;
  default:
    return state;
  }
};

export default notes;