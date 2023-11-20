const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import routes from './routes.js'

import { HomePage } from './pages/HomePage.jsx'
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
                        
                       {routes.map((route) => (
            <Route key={route.path} element={route.component} path={route.path} />
          ))}
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}


