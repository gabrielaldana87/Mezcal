const scatterPlotXDom = (state = {}, action ) => {
  switch (action.type) {
  case 'SET_CENSUS_X_DOMAIN' : {
    const { xDomain } = action.payload;
    return { ... state, census : {xDomain: xDomain }};
  }
  default:
    return state;
  }
};

export default scatterPlotXDom;