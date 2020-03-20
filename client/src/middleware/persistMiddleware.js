const persistMiddleware = store => next => action => {
  next(action);
  const {
    user,
    messages,
    notes,
    cardsById,
    } = store.getState()
  ;
  // console.log(messages)
  // if ( action.type === 'ADD_NOTE' )
  //   fetch('/api/notes', {
  //     method: 'POST',
  //     body: JSON.stringify( cardsById ),
  //     headers: { 'Content-Type': 'application/json' }
  //   })
    ;
};

export default persistMiddleware;