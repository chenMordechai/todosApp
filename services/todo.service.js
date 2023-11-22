
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'
const PAGE_SIZE = 3

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getDefaultFilter,
    getDefaultSort
}


function query(filterBy = {}, sortBy = {}) {
    // return axios.get(BASE_URL).then(res => res.data)
    // if (!filterBy.txt) filterBy.txt = ''
    // if (!filterBy.status) filterBy.status = 'all'
    // if (!sortBy.type) sortBy.type = ''
    // if (!sortBy.des) sortBy.des = 1
    // else sortBy.des = -1

    return storageService.query(STORAGE_KEY)
        .then(todos => {
            const todosData ={
                allTodosCount : todos.length,
                doneTodosCount : todos.filter(t=>t.isDone).length,
                todosToDisplay:[],
                pageCount:0
            }
            let todosToDisplay = todos.slice()
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                todosToDisplay = todosToDisplay.filter(t => regExp.test(t.txt))
            }
            
            if (filterBy.status !== undefined && filterBy.status !== 'all') {
                todosToDisplay = todos.filter(t => t.isDone && filterBy.status === 'done'
                || !t.isDone && filterBy.status === 'active')
            }
            
            if (sortBy.type) {
                todosToDisplay.sort(((t1, t2) => t1.txt.localeCompare(t2.txt) * sortBy.des))
            }
            const pageCount = Math.ceil(todosToDisplay.length / PAGE_SIZE)
            if (filterBy.pageIdx !== undefined) {
                let start = filterBy.pageIdx * PAGE_SIZE // 0 , 3 , 6 , 9
                todosToDisplay = todosToDisplay.slice(start, start + PAGE_SIZE)
            }
            todosData.pageCount = pageCount
            todosData.todosToDisplay = todosToDisplay
            return todosData
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

function getDefaultFilter() {
    return { txt: '', status: 'all' , pageIdx:0 }
}
function getDefaultSort() {
    return { type: '', des: false }
}


