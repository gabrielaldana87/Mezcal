const cardsById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      const { noteText, cardId } = action.payload;
      return { ...state, [cardId] : { note: noteText, _id: cardId }};
    }
  default:
    return state;
  }
};

export default cardsById;