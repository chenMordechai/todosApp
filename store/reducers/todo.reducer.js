import { todoService } from "../../services/todo.service.js"
import { msgService } from "../../services/msg.service.js"

export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_FILTER = 'SET_FILTER'
export const SET_PAGE_COUNT = 'SET_PAGE_COUNT'
export const SET_SORT = 'SET_SORT'
export const SET_ALL_TODOS_COUNT = 'SET_ALL_TODOS_COUNT'
export const SET_TODOS_DONE_COUNT = 'SET_TODOS_ISDONE_COUNT'
export const SET_IS_LOADING = 'SET_IS_LOADING'

export const SET_MSG = 'SET_MSG'

const initialState = {
    todosToDisplay: [],
    allTodosCount: 0,
    doneTodosCount: 0,
    filterBy: todoService.getDefaultFilter(),
    sortBy: todoService.getDefaultSort(),
    isLoading: false,
    pageCount: 0,
    msg: null

}

export function todoReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            const { todosToDisplay, allTodosCount, doneTodosCount, pageCount } = action
            return { ...state, todosToDisplay, allTodosCount, doneTodosCount, pageCount }

        case SET_TODOS_DONE_COUNT:
            return { ...state, doneTodosCount: action.count }

        case SET_ALL_TODOS_COUNT:
            return { ...state, allTodosCount: action.count }

        case ADD_TODO:
            return { ...state, todosToDisplay: [action.todo, ...state.todosToDisplay] }

        case REMOVE_TODO:
            return { ...state, todosToDisplay: state.todosToDisplay.filter(t => t._id !== action.todoId) }

        case UPDATE_TODO:
            return { ...state, todosToDisplay: state.todosToDisplay.map(t => t._id === action.savedTodo._id ? action.savedTodo : t) }

        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        case SET_PAGE_COUNT:
            return { ...state, pageCount: action.pageCount }

        case SET_SORT:
            return { ...state, sortBy: action.sortBy }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case SET_MSG:
            return { ...state, msg: action.msg }

        default:
            return state
    }
}
