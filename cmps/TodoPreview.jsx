
const { Link } = ReactRouterDOM

export function TodoPreview({ todo, onUpdateTodo, onRemoveTodo }) {

    function onToggleTodo() {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        onUpdateTodo(todoToSave)
    }
    return (
        <section className="todo-preview">
            <button onClick={() => onRemoveTodo(todo._id)}>x</button>
            <span onClick={onToggleTodo} className={todo.isDone ? 'done' : ''}>
                {todo.txt}
            </span>
            <Link to={`edit/${todo._id}`}>  Edit</Link>
        </section>
    )
}