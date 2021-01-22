const initialState = {
  data: {
    msgId: null,
    taskName: null,
    time: null,
    statusId: null,
    statusName: null,
    noteText: '',
  },
  loading: false,
  error: null
};

const note = ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'WRITE_NOTE_BEGIN':
      return {
      ...state,
      loading: true,
      error: null
      }
      ;
  case 'WRITE_NOTE_SUCCESS':
    const { noteText, taskName, statusId, statusName, userId, categoryId, msgId, time } = action.payload;
    //
    return {
        ...state,
        loading: false,
        data: {
          categoryId,
          msgId ,
          taskName,
          time,
          statusId,
          statusName,
          noteText
        }
      }
      ;
  case 'WRITE_NOTE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: {}
      }
      ;
  case 'GET_NOTE_BEGIN':
    return {
      ...state,
      loading: true,
      error: null
    }
    ;
  case 'GET_NOTE_SUCCESS':
    return {
      ...state,
      loading: false,
      data: noteText,
    }
    ;
  case 'GET_NOTE_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      data: {
        noteText: ''
      }
    }
    ;
  case 'MODIFY_NOTE_TASK_BEGIN':
    return {
      ...state,
      loading: true,
      error: null
    }
    ;
  case 'MODIFY_NOTE_TASK_SUCCESS':
    console.log(action.payload);
    return {
      ...state,
      loading: false,
      data: noteText
    }
    ;
  case 'MODIFY_NOTE_TASK_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      data: {
        noteText: ''
      }
    }
    ;
  default:
    return state;
  }
};

export default note;

