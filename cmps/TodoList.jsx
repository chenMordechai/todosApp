import { TodoPreview } from "./TodoPreview.jsx";


export function TodoList({ todos, onUpdateTodo , onRemoveTodo }) {
    return (
        <section className="todo-list">
            {todos.map(todo => <li key={todo._id}>
                <TodoPreview todo={todo} onUpdateTodo={onUpdateTodo} onRemoveTodo={onRemoveTodo} />
            </li>)}

        </section>
    )
}