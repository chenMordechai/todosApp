const { useSelector, useDispatch } = ReactRedux


export function AppFooter() {
    const userBalance = useSelector(storeState => storeState.loggedinUser.balance)

    return (
        <footer>
            {userBalance && <h2>userBalance:{userBalance}</h2>}
        </footer>
    )
}
