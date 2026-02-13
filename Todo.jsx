import React, { useState, useEffect } from "react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim() === "") return;

    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="todo-container">
      <h2>React Todo App</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <span onClick={() => toggleComplete(index)}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
