import {FETCHQUIZESERROR, FETCHQUIZESSTART, FETCHQUIZESSUCCESS, FETCHQUIZSUCCESS} from "../actions/ActionTypes";

const initialState={
    quizes:[],
    loading:false,
    error:null,
    results: {},//{[id]:"success"||"error"}
    isFinished: false,
    activeQuistion: 0,
    answerState: null,
    quiz: null,

}
export default function quizReducer(state=initialState,action) {
    switch (action.type) {
        case FETCHQUIZESSTART:
            return {
                ...state,loading: true
            }
        case FETCHQUIZESSUCCESS:
            return {
                ...state,loading:false,quizes:action.quizes
            }
        case FETCHQUIZESERROR:
            return {
                ...state,loading:false,error: action.error
            }
            case FETCHQUIZSUCCESS:
            return {
                ...state,loading:false,quiz: action.quiz
            }
        default:
            return state

    }

}