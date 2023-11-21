import { TodoList } from "../cmps/TodoList.jsx";
import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { SET_TODOS, ADD_TODO, REMOVE_TODO, UPDATE_TODO, SET_FILTER, SET_TODOS_ISDONE_LENGTH, SET_USER_BALANCE, SET_USER_ACTIVITIES } from '../store/store.js'
import { userService } from "../services/user.service.js";
import { TodoAdd } from "../cmps/TodoAdd.jsx";

const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function TodoApp() {
    const dispatch = useDispatch()

    const todos = useSelector(storeState => storeState.todos)
    const filterBy = useSelector(storeState => storeState.currFilterBy)
    const user = useSelector(storeState => storeState.loggedinUser)

    useEffect(() => {
        todoService.query(filterBy)
            // use dispatch
            .then(todos => {
                dispatch({ type: SET_TODOS, todos })
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todo')
            })
    }, [filterBy])

    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
                dispatch({ type: REMOVE_TODO, todoId })
                userService.addActivity('Remove the Todo', todoId)
                    .then(activities => {
                        dispatch({ type: SET_USER_ACTIVITIES, activities: activities })
                    })
            })
            .catch(err => {
                showErrorMsg('Cannot remove todo', err)
            })
    }

    function onAddTodo(todoToSave) {
        // const todoToSave = todoService.getEmptyTodo()
        todoService.save(todoToSave)
            .then((savedTodo) => {
                dispatch({ type: ADD_TODO, todo: savedTodo })
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
                userService.addActivity('Add a Todo!!!!', savedTodo.txt)
                    .then(activities => {
                        dispatch({ type: SET_USER_ACTIVITIES, activities: activities })
                    })
            })
            .catch(err => {
                showErrorMsg('Cannot add todo', err)
            })
    }

    function onUpdateTodo(todoToSave) {
        todoService.save(todoToSave)
            .then(savedTodo => {
                dispatch({ type: UPDATE_TODO, savedTodo })
                dispatch({ type: SET_TODOS_ISDONE_LENGTH })
                userService.addActivity('Update a Todo!!!!', savedTodo.txt)
                    .then(activities => {
                        dispatch({ type: SET_USER_ACTIVITIES, activities: activities })
                    })
                userService.updateBalance(10)
                    .then((newScore) => {
                        dispatch({ type: SET_USER_BALANCE, balance: newScore })
                    })

            })
            .catch(err => {
                showErrorMsg('Cannot update todo', err)
            })

    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    function getStyleByUser() {
        return {
            color: (user) ? user.prefs.color : '#000',
            backgroundColor: (user) ? user.prefs.bgColor : '#fff'
        }

    }
    return (
        <section className="todo-app" style={getStyleByUser()}>
            <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <h2>Todo App</h2>

            <TodoAdd onAddTodo={onAddTodo} />

            <TodoList todos={todos} onUpdateTodo={onUpdateTodo} onRemoveTodo={onRemoveTodo} />
        </section>
    )
}