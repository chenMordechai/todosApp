import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React


export function TodoFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])


    function handleChange(ev) {
        const { name, value } = ev.target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    return (
        <section className="todo-filter">
            <h2>Todo Filter</h2>
            <form >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} name="txt" value={filterByToEdit.txt} type="text" id="txt" />
                <br />
                <select onChange={handleChange} name="status" value={filterByToEdit.status} >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="done">Done</option>
                </select>
            </form>
        </section>
    )
}