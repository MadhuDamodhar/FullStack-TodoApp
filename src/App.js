import React, { useState, useEffect } from "react";
import "./App.css";
import Cards from "./Cards";
import Service from "./Service";


function App() {
  const [todo, setTodo] = useState({
    task: "",
    description: "",
  });

  const [tasks, setTasks] = useState([]);
  const [validationError, setValidationError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo.task.trim() || !todo.description.trim()) {
      setValidationError("Please fill out both task and description.");
      return;
    }
    
    Service.addTodo(todo)
      .then((data) => {
        setTasks((prevTasks) => [...prevTasks, data]);
        setTodo({ task: "", description: "" });
        setValidationError("");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    Service.getTodos()
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container-fluid" id="App">
      <div className="nav">
        <h1>FullStack-TodoApp</h1>
      </div>
      <form
        id="myForm"
        className="form-group container"
        onSubmit={handleSubmit}
      >
        <h4>Enter Task details</h4>
        <input
          name="task"
          type="text"
          placeholder="Task..."
          className="form-control"
          value={todo.task}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          name="description"
          type="text"
          placeholder="Description..."
          className="form-control"
          value={todo.description}
          onChange={handleInputChange}
          autoComplete="off"
        />
        {validationError && <p className="text-danger">{validationError}</p>}
        <div className="btn1">
          <button type="submit" className="btn btn-primary">
            Save Task
          </button>
        </div>
      </form>
      <div className="tasks">
        {tasks.map((task) => (
          <Cards
            key={task.id}
            id={task.id}
            todo={task.task}
            description={task.description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
