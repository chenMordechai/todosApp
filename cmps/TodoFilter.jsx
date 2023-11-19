

export function TodoFilter({filterBy , changeFilterBy}) {

    function handleChange(ev){
const {name,value} = ev.target
changeFilterBy({...filterBy , [name]: value})
    }

    return (
        <section className="todo-filter">
            <h2>Todo Filter</h2>
            <label htmlFor="txt">Text:</label>
            <input onChange={handleChange} name="txt" value={filterBy.txt} type="text" id="txt" />
            <br />
            <select onChange={handleChange} name="status" value={filterBy.status} >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="done">Done</option>
            </select>
        </section>
    )
}