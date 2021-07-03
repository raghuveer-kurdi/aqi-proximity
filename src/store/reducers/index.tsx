import { combineReducers } from "redux";
import aqiReducer from "./AqiReducer";

const rootReducer = combineReducers({
  aqi: aqiReducer,
});
export default rootReducer;
