const { useSelector, useDispatch } = ReactRedux


export function AppFooter() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    return (
        <footer>
            {user && <h2>userBalance:{user.balance}</h2>}
        </footer>
    )
}
