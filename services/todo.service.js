
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
    return storageService.query(STORAGE_KEY)
    // .then(todos=>{
    //     if(filterBy.status === 'all') return todos
    //     return todos.filter(t=>t.isDone && filterBy.status === 'done' 
    //     || !t.isDone && filterBy.status === 'active')
    // })
}
function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}
function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId)
    .then(()=>{
        userService.addActivity('Remove the Todo', todoId)
    })
}
function save(todo) {
    if (todo._id) {
        userService.updateBalance(10)
        return storageService.put(STORAGE_KEY, todo)
        .then((savedTodo)=>{
            userService.addActivity('Update a Todo', todo.txt)
            return savedTodo
        })
    } else {
        // when switching to backend - remove the next line
        ///// todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, todo)
        .then((savedTodo)=>{
            userService.addActivity('Added a Todo', todo.txt)
        return savedTodo
        })
    }
}

function getEmptyTodo() {
    return {
        txt: 'lalala',
        isDone: false,
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


