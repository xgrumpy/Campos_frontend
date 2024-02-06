import thunkMiddleware, { ThunkMiddleware, thunk } from "redux-thunk";
import { createStore, applyMiddleware, Store, AnyAction } from "redux";
import rootReducer from "../src/redux/reducers/index";
import AppState from "../src/redux/models/AppState";

export const store =  createStore(
    rootReducer,
    {},
    applyMiddleware(
        thunk
    )
);

// export default store;