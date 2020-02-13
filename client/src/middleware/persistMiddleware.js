const persistMiddleware = store => next => action => {
  next(action);
  const {
    cardsById
  } = store.getState()
    ;
  console.log(cardsById)
};

export default persistMiddleware;