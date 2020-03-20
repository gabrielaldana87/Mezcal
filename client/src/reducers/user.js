const initialState = {
  data: {
    displayName: null,
    imageUrl: null,
    name: { familyName: null, givenName: null },
    _id: '999999999'
  },
  loading: false,
  error: null
}
;
const user = ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'FETCH_USER_BEGIN' :
      return {
        ...state,
        loading: true,
        error: null
      }
      ;
    case 'FETCH_USER_SUCCESS' :
      const { _id, displayName, imageUrl, name } = action.payload;
      return {
        ...state,
        loading: false,
        data: { _id, displayName, imageUrl, name }
      }
      ;
  case 'FETCH_USER_FAILURE' :
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

export default user;