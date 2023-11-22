
import { ProgressBar } from './ProgressBar.jsx'
import { getAllTodosLength , getTodosDoneLength } from '../store/actions/todo.actions.js'

const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function AppFooter() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    const todosDoneLength = useSelector(storeState => storeState.todoModule.todosDoneLength)
    const todosLength = useSelector(storeState => storeState.todoModule.allTodosLength)

    useEffect(() => {
        getAllTodosLength()
        getTodosDoneLength()
    }, [])


    return (
        <footer>
            <ProgressBar todosLength={todosLength} todosDoneLength={todosDoneLength} />
            {user && <h2>userBalance:{user.balance}</h2>}
        </footer>
    )
}
