import { combineReducers } from "redux";
import worldReducer from "./worldReducer";
import playerDataReducer from "./playerDataReducer";

const rootReducer = combineReducers({
  worldReducer,
  playerDataReducer
});

export default rootReducer;
