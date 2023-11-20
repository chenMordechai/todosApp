import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/store.js'

const { useSelector, useDispatch } = ReactRedux

export function UserProfile() {
    const dispatch = useDispatch()

    const user = useSelector(storeState => storeState.loggedinUser)
console.log('user in profile:', user.activities)
    function handleChange(ev) {
        const { name, value } = ev.target
        let userToSave
        if (name === 'fullname') userToSave = { ...user, [name]: value }
        else userToSave = { ...user, prefs: { ...user.prefs, [name]: value } }
        saveChanges(userToSave)
    }

    function saveChanges(userToSave) {
        userService.save(userToSave)
            .then(user => {
                dispatch({ type: SET_USER, user })
            })
    }

    function submitForm(ev) {
        ev.preventDefault()
        saveChanges(user)
    }

    
  function setActivitieTime(at) {
    const timeDiff = new Date(Date.now() - at)
    const atByMin = timeDiff.getMinutes()
    if (atByMin < 60) return atByMin + ' minutes ago:'
    else if (atByMin > 60) return 'Couple of hours ago: '
    else if (atByMin > 60 * 24) return 'A day or more ago: '
  }


    if (!user) return ''
    return (
        <section className="user-profile">
            <h2>User Profile</h2>
            <h2>Name : {user.fullname}</h2>

            <form onSubmit={submitForm}>
                <label htmlFor="fullname">Full Name:</label>
                <input onChange={handleChange} type="text" value={user.fullname} id="fullname" name="fullname" />
                <br />
                <label htmlFor="color">Color:</label>
                <input onChange={handleChange} type="color" value={user.prefs.color} id="color" name="color" />
                <br />
                <label htmlFor="bgColor">BG Color:</label>
                <input onChange={handleChange} type="color" value={user.prefs.bgColor} id="bgColor" name="bgColor" />
                <br />
                <button>Save</button>
            </form>

            <h2>Activities:</h2>
            {user.activities.map((a, i) => <li key={i}> 
           { setActivitieTime(a.at)}
            {a.txt}
            </li>)}
        </section>
    )
}