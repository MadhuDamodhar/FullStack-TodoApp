import React, { useState, useEffect } from "react";
import "./App.css";
import Service from "./Service";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [toggleTheme, setToggleTheme] = useState(true);
  const [success, setSuccess] = useState('');
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState({
    task: "",
    description: "",
    completed:""
  });
  const [tasks, setTasks] = useState([]);
  const [validationError, setValidationError] = useState("");
  const [handleEditOrAdd,setHandleEditOrAdd] = useState(!true) 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    Service.deleteTodoById(id)
      .then((res) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
        setSuccess("success");
        setValidationError("Deleted successfully");
        loadTodos();

        setTimeout(() => {
          setValidationError(""); // Set to empty to hide the message
        }, 1500);
      })
      .catch((err) => {
        setSuccess("error");
        setValidationError("Error deleting todo");

        setTimeout(() => {
          setValidationError("");
        }, 1500);
      });
  };
  
  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  
    Service.updateComplte(id, { completed: !tasks.find(task => task.id === id).completed })
      .then((res) => {
        setTasks(updatedTasks);
        const taskName = updatedTasks.find(task => task.id === id).task;
        
        if (res.data.completed) {
          setSuccess("success");
          setValidationError(`Congrats! Task " ${taskName} " completed. Great job!`);
        } else {
          setSuccess("error");
          setValidationError(`Task " ${taskName} " marked as incomplete. Please review.`);
        }
  
        setTimeout(() => {
          setValidationError("");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setSuccess("error");
        setValidationError("Error updating task. Please try again.");
        setTimeout(() => {
          setValidationError("");
        }, 1500);
      });
  };
  
  console.log(todo.completed);
 
  
    const [todoId,setToodoId]=useState(0);
    const handleUpdate = ( id )=>{
if(!handleEditOrAdd){
  Service.getTodoById(id).then((res)=>{
    setTodo(res.data)
    setToodoId(id)
  }).catch((err)=>{
    console.log("error while fetching for update");
  })
}else{
  setTodo({
    task: "",
    description: ""
  })
}
    }
  
    const handleSave=(e)=>{
      e.preventDefault();
      if (!todo.task.trim() || !todo.description.trim()) {
        setValidationError("Please fill out both task and description.");
        setSuccess("error");
        setCount(0)
        setTodo({
          task: "",
          description: ""
        })
        setTimeout(() => {
          setValidationError("");
        }, 1500);
        return;
      }
      Service.updateTodoById(todoId,todo).then((res)=>{
        console.log("updated");
        setValidationError("Updated Task Deatils Successfully.");
        setSuccess("success");
        setCount(0)
        setHandleEditOrAdd(!handleEditOrAdd)
        setTodo({
          task: "",
          description: ""
        })
        loadTodos();
        setTimeout(() => {
          setValidationError("");
        }, 1500);
      }).catch((err)=>{
        console.log(err);
      })
      setTimeout(() => {
        setValidationError("");
      }, 1500);

    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!todo.task.trim() || !todo.description.trim()) {
        setValidationError("Please fill out both task and description.");
        setSuccess("error");
        setCount(0)
        setTodo({
          task: "",
          description: ""
        })
        setTimeout(() => {
          setValidationError("");
        }, 1500);
        return;
      }
  

      Service.addTodo(todo)
        .then((data) => {
          setTasks((prevTasks) => [...prevTasks, data]);
          setTodo({ task: "", description: "" });
          setSuccess("success");
          setValidationError("Task added successfully !");        
          setTimeout(() => {
            setValidationError("");
          }, 1500);
          setCount(0);
          loadTodos();
        })
        .catch((err) => {
          console.error(err);
          setSuccess("error");
          setValidationError("Failed to add task. Please try again");
          setTimeout(() => {
            setValidationError("");
          }, 1500);
        });
    };

 console.log(todo);
 

 
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    Service.getTodos()
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
        
      })
      .catch((err) => console.error(err));
  };

  const handleTheme = () => {
    setToggleTheme(!toggleTheme);
    document.body.classList.toggle('dark');
  };

  return (
    <div id="container" className="container">
      <div className="wrapper">
        <span 
          style={{ display: validationError ? "block" : "none" }} 
          id={success === "success" ? "status" : "error"}
        >
          {validationError}
        </span>
        <div className="header">
          <div className="fields">
            <button className="apptitle">
              Task Master <span><i className="fas fa-tasks"></i></span>
            </button>
            {count === 0 ? (
              <input
                type="text"
                name="task"
                value={todo.task}
                placeholder="Task name"
                onChange={handleInputChange}
              />
            ) : (
              <input
                type="text"
                name="description"
                value={todo.description}
                onChange={handleInputChange}
                placeholder="Task description"
              />
            )}

         {
          handleEditOrAdd ?(

            <button
            onClick={(e) => {
              count === 0 ? setCount(1) : handleSave(e);
            }}
            id="update"
          >
            {count === 0 ? "Enter" : "Update Task"}
          </button>
           

          ):(
            <button
            onClick={(e) => {
              count === 0 ? setCount(1) : handleSubmit(e);
            }}
            id="enter"
          >
            {count === 0 ? "Enter" : "Add Task"}
          </button>

          )
         }

           


          </div>
          <button id="light" onClick={handleTheme}>
            {toggleTheme ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
        </div>

        <ul className="body">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <li className={task.completed?"markedCard":"card"} key={task.id}>
                <div className="value">
                  <h6  style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                    Name: <span id="taskName">{task.task}</span>
                  </h6>
                  <div className="actionsBtn">
                    <button onClick={()=>{handleCompleteTask(task.id)}}>
                      <i style={{ color: 'green' }} className={task.completed? "fas fa-times" : "fas fa-check"}></i>
                    </button>
                    <button onClick={()=>{handleUpdate(task.id)
                      setHandleEditOrAdd(!handleEditOrAdd)
                    }}>
                      <i style={{ color: 'green' }} className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => { handleDelete(task.id) }}>
                      <i style={{ color: 'red' }} className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}   id="description" >
                Description: <p>{task.description}</p>
              </span>
              
              </li>
            ))
          ) : (
            <h6 id="err" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Todos</h6>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
