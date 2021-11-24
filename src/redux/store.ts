import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import { defaultState } from "./initialState";

export default function configureStore() {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware);
  const composedEnhancers = compose(middlewareEnhancer);

  const store = createStore(rootReducer, defaultState, composedEnhancers);

  return store;
}
