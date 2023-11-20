import { userService } from "../services/user.service.js"

const { createStore, compose } = Redux

export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_FILTER = 'SET_FILTER'
export const SET_TODOS_ISDONE_LENGTH = 'SET_TODOS_ISDONE_LENGTH'

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
    todos: [],
    currFilterBy: { txt: '', status: 'all' },
    loggedinUser: userService.getLoggedinUser(),
    todosIsDoneLength: 0,
}


function appReducer(state = initialState, action) {
    let todos
    switch (action.type) {
        case SET_TODOS:
            if (state.currFilterBy.status === 'all') todos = action.todos
            else {
                todos = action.todos.filter(t => t.isDone && state.currFilterBy.status === 'done'
                    || !t.isDone && state.currFilterBy.status === 'active')
            }
            const regex = new RegExp(state.currFilterBy.txt, 'i')
            todos = todos.filter(t => regex.test(t.txt))
            return { ...state, todos }

        case SET_TODOS_ISDONE_LENGTH: {
            return { ...state, todosIsDoneLength: state.todos.filter(t => t.isDone).length }
        }
        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.todo] }

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(t => t._id !== action.todoId) }

        case UPDATE_TODO:
            return { ...state, todos: state.todos.map(t => t._id === action.todo._id ? action.todo : t) }

        case SET_FILTER:
            return { ...state, currFilterBy: action.filterBy }

        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case SET_USER_BALANCE:
            const user = { ...state.loggedinUser, balance: state.loggedinUser.balance + action.balance }
            return { ...state, loggedinUser: user }

        // case SAVE_USER:
        //     return { ...state, loggedinUser: action.user }


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

