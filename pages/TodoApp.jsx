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
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
            })
    }

    function removeTodo(todoId) {
        // console.log('remove:', todoId)
        todoService.remove(todoId)
            .then(() => {
                console.log('then:')
                showSuccessMsg('Todo removed')
                dispatch({ type: REMOVE_TODO, todoId })
            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function toggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
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

    return (
        <section className="todo-app">
            <TodoFilter filterBy={filterBy} changeFilterBy={changeFilterBy} />
            <h2>Todo App</h2>
            <button onClick={onAddTodo}>Add Todo</button>

            <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />


        </section>
    )
}