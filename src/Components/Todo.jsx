import { useState } from "react"
import '../css/Todo.css'

export default function Todo() {
    // State for the current input value
    const [todo, setTodo] = useState("");
    // State for the list of todos (each todo is an object)
    const [todos, setTodos] = useState([]);

    // Update the input value as the user types
    function handleChange(e) {
        setTodo(e.target.value);
    }
    
    // Add a new todo to the list when the form is submitted
    function handleSubmit(e) {
        e.preventDefault();
        if (todo.trim() === "") return; // Prevent adding empty todos
        setTodos([...todos, { text: todo, completed: false }]); // Add as object
        setTodo(""); // Clear input after adding
    }

    // Delete only the first occurrence of the clicked todo item
    function handleDelete(item) {
        const index = todos.findIndex(t => t.text === item.text && t.completed === item.completed);
        if (index !== -1) {
            setTodos([
                ...todos.slice(0, index),
                ...todos.slice(index + 1)
            ]);
        }
    }

    // Toggle the completed state of a todo
    function handleToggle(idx) {
        setTodos(todos.map((todo, i) =>
            i === idx ? { ...todo, completed: !todo.completed } : todo
        ));
    }

    // Count completed and incomplete tasks
    const checked = todos.filter(todo => todo.completed).length;
    const unchecked = todos.length - checked;

    return (
        <>
            <div>
                {/* Todo input form */}
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        type="text"
                        value={todo}
                        placeholder="Enter Your Task..." // <-- Add this line
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
            {/* List of todos */}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {todos.map((item, idx) => (
                    <li key={idx}>
                        <h2 style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                            <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleDelete(item)}
                                style={{ marginRight: "10px", marginLeft: 0 }} // Optional inline style for spacing
                            > X </button>
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => handleToggle(idx)}
                            />
                            {item.text}
                        </h2>
                    </li>
                ))}
            </ul>
            <h4>Complete Tasks: {checked}</h4>
            <h4>Incomplete Tasks: {unchecked}</h4>
        </>
    )
}

