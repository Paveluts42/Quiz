import {CREATEQUIZQUISTION, RESETQUIZCREATOR} from "./ActionTypes"
import axios from "../../axios/axios-quiz"

export function createQuizQuistion(item) {
    return {
        type: CREATEQUIZQUISTION,
        item
    }
}

export function resetQuizCreator() {
return{
    type:RESETQUIZCREATOR,
}
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post("/quizes.json", getState().create.quiz)
dispatch(resetQuizCreator())
    }
}