import { TodoList } from "../cmps/TodoList.jsx";
import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { TodoAdd } from "../cmps/TodoAdd.jsx";

import { SET_FILTER, SET_SORT, SET_MSG } from '../store/reducers/todo.reducer.js'
import { loadTodos, removeTodo, addTodo, updateTodo, removeTodoOptimistic } from '../store/actions/todo.actions.js'
import { TodoSort } from "../cmps/TodoSort.jsx";

const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function TodoApp() {
    const dispatch = useDispatch()

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const sortBy = useSelector(storeState => storeState.todoModule.sortBy)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    const pageCount = useSelector(storeState => storeState.todoModule.pageCount)

    useEffect(() => {
        loadTodos()
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('Cannot load todo')
            })
    }, [filterBy, sortBy])

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
                // showErrorMsg('Cannot update todo', err)
            })
        // loadTodos()
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    function onSetSort(sortBy) {
        dispatch({ type: SET_SORT, sortBy })

    }

    function onChangePage(diff) {
        let newPageIdx = filterBy.pageIdx + diff
        if (newPageIdx < 0) newPageIdx = pageCount - 1
        if (newPageIdx >= pageCount) newPageIdx = 0
        // console.log('pageIdx:', pageIdx)
        dispatch({ type: SET_FILTER, filterBy: { ...filterBy, pageIdx: newPageIdx } })
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

            <TodoSort sortBy={sortBy} onSetSort={onSetSort} />

            <TodoAdd onAddTodo={onAddTodo} />

            <h2><button onClick={() => { onChangePage(-1) }}>-</button>Page:{filterBy.pageIdx + 1} <button onClick={() => { onChangePage(1) }}>+</button></h2>

            {isLoading && <h2>Loading...</h2>}
            {!isLoading && <TodoList todos={todos} onUpdateTodo={onUpdateTodo} onRemoveTodo={onRemoveTodo} />}
            {!isLoading && !todos.length && <h2>No {filterBy.status} Todos To Show</h2>}
        </section>
    )
}