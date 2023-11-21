import { todoService } from "../../services/todo.service.js"

export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_FILTER = 'SET_FILTER'
export const SET_TODOS_ISDONE_LENGTH = 'SET_TODOS_ISDONE_LENGTH'

const initialState = {
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    todosIsDoneLength: 0,
}

export function todoReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }

        case SET_TODOS_ISDONE_LENGTH: {
            return { ...state, todosIsDoneLength: state.todos.filter(t => t.isDone).length }
        }
        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.todo] }

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(t => t._id !== action.todoId) }

        case UPDATE_TODO:
            return { ...state, todos: state.todos.map(t => t._id === action.savedTodo._id ? action.savedTodo : t) }

        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        default:
            return state
    }
}
