import { combineReducers } from 'redux';
import user from './user';
import board from './board';
import note from './note';
import notes from './notes';
import labels from './labels';
import cardsById from './cardsById';

export default combineReducers({
  user,
  board,
  note,
  notes,
  labels,
  cardsById
});
