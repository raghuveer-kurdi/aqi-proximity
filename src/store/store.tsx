import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";

const configureStore = () => createStore(rootReducer);

export default configureStore;
