
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo
}


function query(filterBy = {}) {
    // return axios.get(BASE_URL).then(res => res.data)
    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.status) filterBy.status = 'all'
    const regExp = new RegExp(filterBy.txt, 'i')

    return storageService.query(STORAGE_KEY)
        .then(todos => {
            let todosToSend
            if (filterBy.status === 'all') todosToSend = todos
            else todosToSend = todos.filter(t => t.isDone && filterBy.status === 'done'
                || !t.isDone && filterBy.status === 'active')
            return todosToSend.filter(t => regExp.test(t.txt))
        })
}
function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}
function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId)

}
function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
            .then((savedTodo) => {
                return savedTodo
            })
    } else {
        return storageService.post(STORAGE_KEY, todo)
            .then((savedTodo) => {
                return savedTodo
            })
    }
}

function getEmptyTodo() {
    return {
        txt: '',
        isDone: false,
    }
}


