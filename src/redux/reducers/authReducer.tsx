import { AnyAction as Action } from "redux";
import { CREATE_USER_SUCCESS } from "../type/type";

import AuthState from "../models/authState";
// import User from "../models/User.model";

const initialState: AuthState = {
    loading: false,
    auth: undefined
};

const authReducer = (state: AuthState = initialState, action: Action): AuthState => {
    switch (action.type) {
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                auth: action.payload
            }

        default:
            return {...state, loading: false}
    }
}

export default authReducer;