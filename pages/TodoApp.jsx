import { TodoList } from "../cmps/TodoList.jsx";
import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from "../services/user.service.js";
import { TodoAdd } from "../cmps/TodoAdd.jsx";

import { SET_TODOS, ADD_TODO, REMOVE_TODO, UPDATE_TODO, SET_FILTER, SET_TODOS_ISDONE_LENGTH } from '../store/reducers/todo.reducer.js'
import { SET_USER_BALANCE, SET_USER_ACTIVITIES } from '../store/reducers/user.reducer.js'
import { loadTodos, removeTodo, addTodo, updateTodo, removeTodoOptimistic } from '../store/actions/todo.actions.js'

const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function TodoApp() {
    const dispatch = useDispatch()

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        loadTodos()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todo')
            })
    }, [filterBy])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .catch(err => {
                showErrorMsg('Cannot remove todo', err)
            })
    }

    function onAddTodo(todoToSave) {
        addTodo(todoToSave)
            .catch(err => {
                showErrorMsg('Cannot add todo', err)
            })
    }

    function onUpdateTodo(todoToSave) {
        updateTodo(todoToSave)
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