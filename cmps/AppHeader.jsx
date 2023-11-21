const { NavLink } = ReactRouterDOM
const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { SET_USER } from '../store/reducers/user.reducer.js'
import { SET_TODOS_ISDONE_LENGTH } from '../store/reducers/todo.reducer.js'
import { logout } from '../store/actions/user.actions.js'
import { getAllTodosLength , getTodosDoneLength } from '../store/actions/todo.actions.js'

import { LoginSignup } from './LoginSignup.jsx'
import { ProgressBar } from './ProgressBar.jsx'
import { Msg } from './Msg.jsx'

export function AppHeader() {
    const dispatch = useDispatch()
    // get from storeState
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    // console.log('user:', user)
    const todosDoneLength = useSelector(storeState => storeState.todoModule.todosDoneLength)
    const todosLength = useSelector(storeState => storeState.todoModule.allTodosLength)

    useEffect(() => {
        getAllTodosLength()
        getTodosDoneLength()
    }, [todosLength])

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        // move to a function and use dispatch
        logout()
            .then(() => {
                // showSuccessMsg('Logout successfully')
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('Cannot logout')
            })
    }

    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/todo">Todo</NavLink> |
                <NavLink to="/profile">Profile</NavLink>
            </nav>
            <h1>My App</h1>
            <Msg />
            <ProgressBar todosLength={todosLength} todosDoneLength={todosDoneLength} />

            {user && <section className="user-info">
                <p>{user.fullname}</p>
                <button onClick={onLogout}>Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup onSetUser={onSetUser} />
            </section>}



        </header >
    )
}

