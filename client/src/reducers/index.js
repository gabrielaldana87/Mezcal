import { combineReducers } from 'redux';
import user from './user';
import board from './board';
import goal from './goal';
import note from './note';
import notes from './notes';
import labels from './labels';
import status from './status';
import cardsById from './cardsById';

export default combineReducers({
  user,
  board,
  goal,
  labels,
  note,
  notes,
  status,
  cardsById
});
