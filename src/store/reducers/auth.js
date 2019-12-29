import {AUTHLOGOUT, AUTHSUCCESS} from "../actions/ActionTypes";

const initialState={
    token:null,
}

export default function authReducer(state=initialState,action) {
switch (action.type) {
    case AUTHSUCCESS:
        return {
            ...state,token: action.token
        }
    case AUTHLOGOUT:
        return {
            ...state,token: null
        }
    default:
        return state
}
}