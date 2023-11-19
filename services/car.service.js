
import {storageService} from './async-storage.service.js'
import {utilService} from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'carDB'

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar
}


function query() {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
}
function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}
function remove(carId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, carId)
}
function save(car) {
    if (car._id) {
        return storageService.put(STORAGE_KEY, car)
    } else {
        // when switching to backend - remove the next line
        car.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, car)
    }
}

function getEmptyCar() {
    return { 
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),  
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


