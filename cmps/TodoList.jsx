import { TodoPreview } from "./TodoPreview.jsx";


export function TodoList({ todos, toggleTodo , removeTodo }) {
    return (
        <section className="todo-list">
            <h2>Todo List</h2>

            {todos.map(todo => <li key={todo._id}>
                <TodoPreview todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
            </li>)}

        </section>
    )
}