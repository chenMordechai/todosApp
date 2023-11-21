import { todoService } from "../../services/todo.service.js"
import { todoService } from "../../services/util.service.js"

export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_FILTER = 'SET_FILTER'
export const SET_PAGE_COUNT = 'SET_PAGE_COUNT'
export const SET_SORT = 'SET_SORT'
export const SET_TODOS_ISDONE_LENGTH = 'SET_TODOS_ISDONE_LENGTH'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    sortBy: todoService.getDefaultSort(),
    todosIsDoneLength: 0,
    isLoading: false,
    pageCount: 0,
    msg:utilService.getDefaultMsg()

}

export function todoReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }

        case SET_TODOS_ISDONE_LENGTH:
            return { ...state, todosIsDoneLength: state.todos.filter(t => t.isDone).length }

        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.todo] }

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(t => t._id !== action.todoId) }

        case UPDATE_TODO:
            return { ...state, todos: state.todos.map(t => t._id === action.savedTodo._id ? action.savedTodo : t) }

        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        case SET_PAGE_COUNT:
            return { ...state, pageCount: action.pageCount }

        case SET_SORT:
            return { ...state, sortBy: action.sortBy }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}
