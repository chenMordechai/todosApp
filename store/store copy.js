import { userService } from "../services/user.service.js"

const { createStore, compose } = Redux

export const SET_CARS = 'SET_CARS'
export const REMOVE_CAR = 'REMOVE_CAR'
export const ADD_CAR = 'ADD_CAR'
export const UPDATE_CAR = 'UPDATE_CAR'

export const SET_CART_IS_SHOWN = 'SET_CART_IS_SHOWN'
export const REMOVE_CAR_FROM_CART = 'REMOVE_CAR_FROM_CART'
export const ADD_CAR_TO_CART = 'ADD_CAR_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
    count: 101,
    cars: [],
    isCartShown: false,
    shoppingCart: [],
    loggedinUser: userService.getLoggedinUser()
}


function appReducer(state = initialState, action) {
    let cars
    let shoppingCart
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 }
        case 'DECREMENT':
            return { ...state, count: state.count - 1 }
        case 'CHANGE_BY':
            return { ...state, count: state.count + action.diff }

        // Cars
        case SET_CARS:
            return { ...state, cars: action.cars }

        case REMOVE_CAR:
            cars = state.cars.filter(car => car._id !== action.carId)
            return { ...state, cars }

        case ADD_CAR:
            cars = [...state.cars, action.car]
            return { ...state, cars }

        case UPDATE_CAR:
            cars = state.cars.map(car => car._id === action.car._id ? action.car : car)
            return { ...state, cars }


        // Shopping Cart
        case SET_CART_IS_SHOWN:
            return { ...state, isCartShown: action.isCartShown }

        case ADD_CAR_TO_CART:
            shoppingCart = [...state.shoppingCart, action.car]
            return { ...state, shoppingCart }

        case REMOVE_CAR_FROM_CART:
            shoppingCart = state.shoppingCart.filter(car => car._id !== action.carId)
            return { ...state, shoppingCart }

        case CLEAR_CART:
            return { ...state, shoppingCart: [] }

        // User
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case SET_USER_SCORE:
            const user = { ...state.loggedinUser, score: action.score }
            return { ...state, loggedinUser: user }
            
        default:
            return state
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

window.gStore = store


// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

