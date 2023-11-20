const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { CarIndex } from './pages/CarIndex.jsx'
import { store } from './store/store.js'
import { TodoApp } from './pages/TodoApp.jsx'
import { TodoEdit } from './pages/TodoEdit.jsx'
import { UserProfile } from './pages/UserProfile.jsx'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<UserProfile />} path="/profile" />
                            {/* <Route element={<CarIndex />} path="/car" /> */}
                            <Route element={<TodoApp />} path="/todo" />
                            <Route element={<TodoEdit />} path="/todo/edit/:todoId" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}


