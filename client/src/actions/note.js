const GET_NOTE_BEGIN = 'GET_NOTE_BEGIN';
const GET_NOTE_SUCCESS = 'GET_NOTE_SUCCESS';
const GET_NOTE_FAILURE = 'GET_NOTE_FAILURE';

const WRITE_NOTE_BEGIN = 'WRITE_NOTE_BEGIN';
const WRITE_NOTE_SUCCESS = 'WRITE_NOTE_SUCCESS';
const WRITE_NOTE_FAILURE = 'WRITE_NOTE_FAILURE';

const GET_ALL_NOTES_BEGIN = 'GET_ALL_NOTES_BEGIN';
const GET_ALL_NOTES_SUCCESS = 'GET_ALL_NOTES_SUCCESS';
const GET_ALL_NOTES_FAILURE = 'GET_ALL_NOTES_FAILURE';

const MODIFY_NOTE_TASK_BEGIN = 'MODIFY_NOTE_TASK_BEGIN';
const MODIFY_NOTE_TASK_SUCCESS = 'MODIFY_NOTE_TASK_SUCCESS';
const MODIFY_NOTE_TASK_FAILURE = 'MODIFY_NOTE_TASK_FAILURE';

const getNoteBegin = () => ({ type: GET_NOTE_BEGIN });
const getNoteSuccess = note => ({ type: GET_NOTE_SUCCESS, payload: note });
const getNoteFailure = error => ({ type: GET_NOTE_FAILURE, payload: error });

const writeNoteBegin = () => ({ type: WRITE_NOTE_BEGIN });
const writeNoteSuccess = note => ({ type: WRITE_NOTE_SUCCESS, payload: note });
const writeNoteFailure = error => ({ type: WRITE_NOTE_FAILURE, payload: error });

const getAllNotesBegin = () => ({ type: GET_ALL_NOTES_BEGIN });
const getAllNotesSuccess = notes => ({ type: GET_ALL_NOTES_SUCCESS, payload: notes });
const getAllNotesFailure = error => ({ type: GET_ALL_NOTES_FAILURE, payload: error });

const modifyNoteTaskBegin = () => ({ type: MODIFY_NOTE_TASK_BEGIN });
const modifyNoteTaskSuccess = notes => ({ type: MODIFY_NOTE_TASK_SUCCESS, payload: notes });
const modifyNoteTaskFailure = error => ({ type: MODIFY_NOTE_TASK_FAILURE, payload: error });

export const writeNote = noteContext => {
  return dispatch => {
    dispatch(writeNoteBegin());
    return fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify( noteContext ),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(handleErrors)
    .then( res => res.json() )
    .then( note => {
      dispatch(writeNoteSuccess(note));
      return note;
    })
    .catch( error => dispatch(writeNoteFailure( error )));
  }
};

export const getNoteText = msgId => {
  return dispatch => {
    dispatch(getNoteBegin());
    return fetch(`/api/notes/${ msgId }`)
      .then(handleErrors)
      .then( res => res.json() )
      .then( note => {
        dispatch(writeNoteSuccess(note));
        return note;
      })
      .catch( error => dispatch(getNoteFailure( error )));
  }
};

export const getAllNotes = () => {
  return dispatch => {
    dispatch(getAllNotesBegin());
    return fetch('/api/notes')
      .then(handleErrors)
      .then(res => res.json())
      .then( notes => {
        dispatch(getAllNotesSuccess(notes));
        return notes;
      })
      .catch( error => dispatch(getAllNotesFailure( error )));
  }
};

export const modifyTaskNote = taskObj => {
  return dispatch => {
    dispatch(modifyNoteTaskBegin());
    return fetch(`/api/notes`, {
      method: 'PUT',
      body: JSON.stringify( taskObj ),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(handleErrors)
    .then(res => res.json())
    .then( notes => {
      dispatch(modifyNoteTaskSuccess(notes));
      return notes;
    })
    .catch( error => dispatch(modifyNoteTaskFailure( error )));
  }
};
// Handle HTTP errors since fetch won't.
const handleErrors = res => {
  if ( !res.ok ) {
    throw Error(res.statusText);
  }
  return res;
};
