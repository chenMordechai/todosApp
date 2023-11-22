import { todoService } from "../services/todo.service.js"

const { useState } = React

export function TodoAdd({ onAddTodo }) {

    const [todoToAdd, setTodoToAdd] = useState(todoService.getEmptyTodo())

    function handleChange(ev) {
        const { name, value } = ev.target
        setTodoToAdd(prev => ({ ...prev, [name]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onAddTodo(todoToAdd)
        setTodoToAdd(prev => (todoService.getEmptyTodo()))
    }

    return (
        <section className="todo-add">
        <form onSubmit={onSubmit}>
            <input type="text" value={todoToAdd.txt} onChange={handleChange} name="txt" />
            <button>Add Todo</button>
        </form>
        </section>
    )
}