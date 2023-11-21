
import { ProgressBar } from './ProgressBar.jsx'

const { useSelector, useDispatch } = ReactRedux

export function AppFooter() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    // const todosDoneLength = useSelector(storeState => storeState.todoModule.todosIsDoneLength)
    // const todosLength = useSelector(storeState => storeState.todoModule.todos.length)

    return (
        <footer>
            {user && <h2>userBalance:{user.balance}</h2>}
            {/* <ProgressBar todosLength={todosLength} todosDoneLength={todosDoneLength} /> */}
        </footer>
    )
}
