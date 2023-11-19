const { useState } = React
const { useSelector, useDispatch } = ReactRedux


export function HomePage() {
    const dispatch = useDispatch()
    // TODO: move to storeState
    // const [count, setCount] = useState(101)
    const count = useSelector(storeState => storeState.count)

    function changeCount(diff) {
        // TODO: use dispatch
        // setCount(count => count + diff)
        dispatch({type:'CHANGE_BY', diff})
    }

    return (
        <section>
            <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 >
            <img src="assets/img/logo.png" />
        </section >
    )
}