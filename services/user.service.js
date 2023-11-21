import { storageService } from './async-storage.service.js'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    addActivity,
    save,
    updateBalance,
    getById
}

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'


function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            // if (user && user.password !== password) return _setLoggedinUser(user)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = {
        username,
        password,
        fullname,
        balance: 10000,
        activities: [],
        prefs: {
            color: 'black',
            bgColor: 'white'
        }
    }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const { _id, fullname, username, balance, activities, prefs } = user
    const userToSave = {
        _id,
        fullname,
        username,
        balance,
        activities,
        prefs
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


// change name - perfect
function save(user) {
    return storageService.put(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

// change balance - yes reactive not in service
function updateBalance(diff) {
    return getById(getLoggedinUser()._id)
        .then(user => {
            user.balance += diff
            return save(user)
        })
        .then((user) => {
            return user.balance
        })
}

//change activity - not reactive , yes in service
function addActivity(type, txt) {
    const activity = {
        txt: `${type} ${txt}`,
        at: Date.now()
    }
    return getById(getLoggedinUser()._id)
        .then(user => {
            user.activities.push(activity)
            return save(user)
        })
        .then((user) => {
            return user.activities
        })

}
