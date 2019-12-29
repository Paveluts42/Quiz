import {
    FETCHQUIZESERROR,
    FETCHQUIZESSTART,
    FETCHQUIZESSUCCESS,
    FETCHQUIZSUCCESS,
    FINISHQUIZ,
    QUIZNEXTQUESTION,
    QUIZSETSTATE,
    RETRYQUIZ
} from "../actions/ActionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},//{[id]:"success"||"error"}
    isFinished: false,
    activeQuistion: 0,
    answerState: null,
    quiz: null,

}
export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHQUIZESSTART:
            return {
                ...state, loading: true
            }
        case FETCHQUIZESSUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case FETCHQUIZESERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCHQUIZSUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case QUIZSETSTATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }
        case FINISHQUIZ:
            return {
                ...state, isFinished: true
            }
        case QUIZNEXTQUESTION:
            return {
                ...state, answerState: null, activeQuistion: action.number+1
            }
        case RETRYQUIZ:
            return {
                ...state, activeQuistion: 0,
                answerState: null,
                isFinished: false,
                results: {},
            }

        default:
            return state

    }

}