import { combineReducers } from "redux"
import EventReducer from "./event.reducer";

export default combineReducers({
  event: EventReducer
})