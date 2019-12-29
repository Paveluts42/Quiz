import {CREATEQUIZQUISTION, RESETQUIZCREATOR} from "../actions/ActionTypes";

const initialState = {
    quiz: [],
}
export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATEQUIZQUISTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }
        case RESETQUIZCREATOR:
            return {
                ...state,quiz: []
            }
        default:
            return state
    }

}