import { combineReducers } from 'redux';
import cardsById from './cardsById';
import scatterPlotXDom from './scatterPlotXDom';

export default combineReducers({
  cardsById,
  scatterPlotXDom
});