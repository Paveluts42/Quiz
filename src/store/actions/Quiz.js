import axios from "../../axios/axios-quiz"
import {
    FETCHQUIZESERROR,
    FETCHQUIZESSTART,
    FETCHQUIZESSUCCESS,
    FETCHQUIZSUCCESS,
    FINISHQUIZ,
    QUIZNEXTQUESTION,
    QUIZSETSTATE,
    RETRYQUIZ
} from "./ActionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/.json`)
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                        id: key,
                        name: `test #${index + 1}`
                    }
                )
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }

    }

}


export function fetchQuizesStart() {
    return {
        type: FETCHQUIZESSTART
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCHQUIZESSUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCHQUIZESERROR,
        error: e
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZSETSTATE,
        answerState, results
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function finishQuiz() {
    return {
        type: FINISHQUIZ,
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCHQUIZSUCCESS,
        quiz
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZNEXTQUESTION,
        number
    }

}

export function retryQuiz() {
    return {
        type: RETRYQUIZ
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === "success") {
                return
            }
        }
        const question = state.quiz[state.activeQuistion]
        const results = state.results
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = "success"
            }
            dispatch(quizSetState({[answerId]: "success"}, results))


            const timeout = window.setTimeout(() => {

                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {


                    dispatch(quizNextQuestion(state.activeQuistion))
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = "error"
            dispatch(quizSetState({[answerId]: "error"}, results))

        }
    }

}

function isQuizFinished(state) {
    return state.activeQuistion + 1 === state.quiz.length
}