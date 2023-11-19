
const {Link } = ReactRouterDOM

export function TodoPreview({ todo, toggleTodo ,removeTodo }) {

    function onToggleTodo() {
        toggleTodo(todo)
    }
    function onRemoveTodo(ev){
        ev.stopPropagation()
        removeTodo(todo._id)
    }
    return (
        <section className="todo-preview">
            <h3 onClick={onToggleTodo}> 
            <button onClick={onRemoveTodo}>x</button> 
           <span  className={todo.isDone ? 'done' : ''}>{todo.txt} </span> 
            <Link to={`edit/${todo._id}`}>Edit</Link>
            </h3>

        </section>
    )
}