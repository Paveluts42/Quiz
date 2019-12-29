import axios from "axios"
import {AUTHLOGOUT, AUTHSUCCESS} from "./ActionTypes";


export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password, returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAE83okEUbtsoGBVAWBKY3s1tsFOjlDZTs"
        if (isLogin) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAE83okEUbtsoGBVAWBKY3s1tsFOjlDZTs"
        }
        const response = await axios.post(url, authData)
        const data = response.data
        console.log(data)
        const expirationData = new Date(
            new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem("token", data.idToken)
        localStorage.setItem("userId", data.localId)
        localStorage.setItem("expirationData", expirationData)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))

    }
}

export function authSuccess(token) {
    return {
        type: AUTHSUCCESS,
        token
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem("token")
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationData'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime()-new Date().getTime())/1000))
            }
        }
    }
}


export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("expirationData")
    return {
        type: AUTHLOGOUT
    }
}