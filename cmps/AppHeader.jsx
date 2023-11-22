const { NavLink } = ReactRouterDOM
const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { SET_USER } from '../store/reducers/user.reducer.js'
import { SET_TODOS_ISDONE_COUNT } from '../store/reducers/todo.reducer.js'
import { logout } from '../store/actions/user.actions.js'

import { LoginSignup } from './LoginSignup.jsx'
import { Msg } from './Msg.jsx'

export function AppHeader() {
    const dispatch = useDispatch()
    // get from storeState
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

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
            <div className="flex align-center justify-between">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/todo">Todo</NavLink> |
                <NavLink to="/profile">Profile</NavLink>
            </nav>
            <h1>My App</h1>
            </div>

            <Msg />

            {user && <section className="user-info">
                <h3>Hello {user.fullname}</h3>
                <button onClick={onLogout}>Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup onSetUser={onSetUser} />
            </section>}



        </header >
    )
}

