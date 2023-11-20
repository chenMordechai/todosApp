const { NavLink } = ReactRouterDOM
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux


import { userService } from '../services/user.service.js'
import { SET_TODOS_ISDONE_LENGTH, SET_USER } from '../store/store.js'

import { LoginSignup } from './LoginSignup.jsx'
import { ProgressBar } from './ProgressBar.jsx'

export function AppHeader() {
    const dispatch = useDispatch()
    // get from storeState
    // const isCartShown = useSelector(storeState => storeState.isCartShown)
    const user = useSelector(storeState => storeState.loggedinUser)
    console.log('user:', user)
    const todosDoneLength = useSelector(storeState => storeState.todosIsDoneLength)
    const todosLength = useSelector(storeState => storeState.todos.length)

    useEffect(() => {
        dispatch({ type: SET_TODOS_ISDONE_LENGTH })
    }, [todosLength])

    function onSetUser(user) {
        console.log('user:', user)
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        // move to a function and use dispatch
        userService.logout()
            .then(() => {
                // setUser(null)
                dispatch({ type: SET_USER, user: null })

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

