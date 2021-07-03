import { combineReducers } from "redux";
import aqiReducer from "./reducers/AqiReducer";

const rootReducer = combineReducers({
  aqi: aqiReducer,
});
export default rootReducer;
