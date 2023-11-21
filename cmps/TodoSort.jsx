
const { useState, useEffect } = React

export function TodoSort({ sortBy, onSetSort }) {
    // console.log('sortBy:', sortBy)
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        // console.log('sortByToEdit:', sortByToEdit)
        onSetSort({ ...sortByToEdit })
    }, [sortByToEdit])


    function handleChange({ target }) {
        const { name, type } = target
        let { value } = target
        if (type === 'number') value = +value
        if (type === 'checkbox') value = target.checked

        setSortByToEdit(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section className="todo-sort">
            <h2>Todo Sort</h2>
            <form>

                <label htmlFor="sort">Sort By</label>
                <select onChange={handleChange} id="sort" name="type">
                    <option value=""></option>
                    <option value="txt">Title</option>
                </select>
                <label htmlFor="des">Desending</label>
                <input onChange={handleChange} type="checkbox" id="des" name="des" />

            </form>
        </section>
    )
}