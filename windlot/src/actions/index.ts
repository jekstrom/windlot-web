import { LOGIN } from './actionTypes'

export interface Action {
    type: string,
    payload: any
}

export interface LoginStatus {
    loggedIn: boolean,
    loggedInUser: any | null,
    logInMessage: string | null
}

export const login = (loginStatus: LoginStatus) => ({
    type: LOGIN,
    payload: loginStatus
})