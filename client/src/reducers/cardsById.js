const cardsById = ( state = [], action ) => {
  switch ( action.type ) {
  case 'ADD_NOTE' :
    const { cardId , taskName , statusId, noteText , taskId } = action.payload;
    return {
      ...state,
      [cardId] : {
        taskName,
        statusId,
        noteText,
        taskId
      }
    };
  default :
    return state;
  }
};

export default cardsById;