import { HomePage } from './pages/HomePage.jsx'
import { TodoApp } from './pages/TodoApp.jsx'
import { TodoEdit } from './pages/TodoEdit.jsx'
import { UserProfile } from './pages/UserProfile.jsx'

export default [
    {
        path: '/',
        component: <HomePage />,
    },
    {
        path: '/todo',
        component: <TodoApp />,
    },
    {
        path: '/todo/edit/:todoId',
        component: <TodoEdit />,
    },
    {
        path: '/profile',
        component: <UserProfile />,
    }
]