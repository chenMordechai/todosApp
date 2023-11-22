import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/reducers/user.reducer.js'

const { useSelector, useDispatch } = ReactRedux

export function UserProfile() {
    const dispatch = useDispatch()

    const user = useSelector(storeState => storeState.userModule.loggedinUser)

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

    function getStyleByUser() {
        return {
            color: (user) ? user.prefs.color : '#000',
            backgroundColor: (user) ? user.prefs.bgColor : '#fff'
        }

    }


    if (!user) return ''
    return (
        <section className="user-profile" style={getStyleByUser()}>
            <h2>Profile</h2>
            <h2>Name : {user.fullname}</h2>
            <h2>Balance : {user.balance}</h2>

            <form onSubmit={submitForm}>
                <div>

                <label htmlFor="fullname">Full Name:</label>
                <input onChange={handleChange} type="text" value={user.fullname} id="fullname" name="fullname" />
                </div>
                <div>

                <label htmlFor="color">Color:</label>
                <input onChange={handleChange} type="color" value={user.prefs.color} id="color" name="color" />
                </div>
                <div>

                <label htmlFor="bgColor">BG Color:</label>
                <input onChange={handleChange} type="color" value={user.prefs.bgColor} id="bgColor" name="bgColor" />
                </div>
                {/* <button>Save</button> */}
            </form>

            <h2>Activities:</h2>
            {user.activities.map((a, i) => <li key={i}>
                {setActivitieTime(a.at)}
                {a.txt}
            </li>)}
        </section>
    )
}