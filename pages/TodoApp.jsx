import { TodoList } from "../cmps/TodoList.jsx";
import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { SET_TODOS, ADD_TODO, REMOVE_TODO, UPDATE_TODO, SET_FILTER, SET_TODOS_ISDONE_LENGTH, SET_USER_BALANCE } from '../store/store.js'
import { userService } from "../services/user.service.js";

const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function TodoApp() {
    const dispatch = useDispatch()

    const todos = useSelector(storeState => storeState.todos)
    const filterBy = useSelector(storeState => storeState.currFilterBy)
    const user = useSelector(storeState => storeState.loggedinUser)

    useEffect(() => {
        todoService.query()
            // use dispatch
            .then(todos => {
                dispatch({ type: SET_TODOS, todos })
            })
    }, [filterBy])


    function onAddTodo() {
        const todoToSave = todoService.getEmptyTodo()
        todoService.save(todoToSave)
            .then((savedTodo) => {
                dispatch({ type: ADD_TODO, todo: savedTodo })
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add todo')
            })
    }

    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
                dispatch({ type: REMOVE_TODO, todoId })
            })
            .catch(err => {
                showErrorMsg('Cannot remove todo')
            })
    }

    function onUpdateTodo(todoToSave) {
        todoService.save(todoToSave)
            .then(todo => {
                dispatch({ type: UPDATE_TODO, todo })
                dispatch({ type: SET_TODOS_ISDONE_LENGTH })
                dispatch({ type: SET_USER_BALANCE, balance: 10 })
            })
    }

    function changeFilterBy(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    function getStyleByUser(){
        return {
            color:(user)? user.prefs.color : '#000',
            backgroundColor:(user)? user.prefs.bgColor : '#fff'
        }

    }
    return (
        <section className="todo-app" style={getStyleByUser()}>
            <TodoFilter filterBy={filterBy} changeFilterBy={changeFilterBy} />
            <h2>Todo App</h2>
            <button onClick={onAddTodo}>Add Todo</button>

            <TodoList todos={todos} onUpdateTodo={onUpdateTodo} onRemoveTodo={onRemoveTodo} />
        </section>
    )
}