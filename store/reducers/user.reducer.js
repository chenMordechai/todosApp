import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const SET_USER_ACTIVITIES = 'SET_USER_ACTIVITIES'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {
    let user
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case SET_USER_BALANCE:
            user = { ...state.loggedinUser, balance: action.balance }
            return { ...state, loggedinUser: user }

        case SET_USER_ACTIVITIES:
            user = { ...state.loggedinUser, activities: action.activities }
            return { ...state, loggedinUser: user }

        default:
            return state
    }
}
