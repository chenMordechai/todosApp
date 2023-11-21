import { todoService } from "../../services/todo.service.js";
import { userService } from "../../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'


import { SET_TODOS, REMOVE_TODO, ADD_TODO, TODO_UNDO, UPDATE_TODO, SET_TODOS_ISDONE_LENGTH } from "../reducers/todo.reducer.js";
import { SET_USER_ACTIVITIES, SET_USER_BALANCE } from "../reducers/user.reducer.js";

import { store } from "../store.js";

export function loadTodos() {
    const { filterBy } = store.getState().todoModule

    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            // showSuccessMsg('Todo removed')
            store.dispatch({ type: REMOVE_TODO, todoId })
            userService.addActivity('Remove the Todo', todoId)
                .then(activities => {
                    store.dispatch({ type: SET_USER_ACTIVITIES, activities: activities })
                })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function addTodo(todo) {

    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({ type: ADD_TODO, todo: savedTodo })
            // showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            userService.addActivity('Add a Todo!!!!', savedTodo.txt)
                .then(activities => {
                    store.dispatch({ type: SET_USER_ACTIVITIES, activities: activities })
                })
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}

export function updateTodo(todo) {
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type: UPDATE_TODO, savedTodo })
            store.dispatch({ type: SET_TODOS_ISDONE_LENGTH })
            userService.addActivity('Update a Todo!!!!', savedTodo.txt)
                .then(activities => {
                    store.dispatch({ type: SET_USER_ACTIVITIES, activities: activities })
                })
            userService.updateBalance(10)
                .then((newScore) => {
                    store.dispatch({ type: SET_USER_BALANCE, balance: newScore })
                })

        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}
