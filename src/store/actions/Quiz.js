import axios from "../../axios/axios-quiz"
import {FETCHQUIZESERROR, FETCHQUIZESSTART, FETCHQUIZESSUCCESS, FETCHQUIZSUCCESS} from "./ActionTypes";

export function fetchQuizes() {
return async dispatch=>{
    dispatch(fetchQuizesStart())
    try {
              const response=await axios.get(`/quizes/.json`)
              const quizes=[]
              Object.keys(response.data).forEach((key,index)=>{
                  quizes.push({
                      id:key,
                      name:`test #${index+1}`}
                  )
              })
             dispatch(fetchQuizesSuccess(quizes))
          }catch (e) {
        dispatch(fetchQuizesError(e))
          }

}

}
export function fetchQuizesStart() {
return{
    type:FETCHQUIZESSTART
}
}
export function fetchQuizesSuccess(quizes) {
return{
    type:FETCHQUIZESSUCCESS,
    quizes
}
}
export function fetchQuizesError(e) {
return{
    type:FETCHQUIZESERROR,
    error:e
}
}
export function fetchQuizById(quizId) {
    return async dispatch=>{
        dispatch(fetchQuizesStart())
    try {
        const response=await axios.get(`/quizes/${quizId}.json`)
        const quiz=response.data
       dispatch(fetchQuizSuccess(quiz))
    }catch (e) {
        dispatch(fetchQuizesError(e))
        }
    }
}
export function fetchQuizSuccess(quiz) {
return{
    type:FETCHQUIZSUCCESS,
    quiz
}
}