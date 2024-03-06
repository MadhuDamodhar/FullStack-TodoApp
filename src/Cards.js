import React, { useEffect, useState } from "react";
import "./Card.css";
import Service from "./Service";

function Cards({ todo, description, id }) {
  
  const handleDelete = (id) => {
    Service.deleteTodoById(id)
      .then((data) => {
        console.log(data);
        
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };







  const [openForm, isOpenForm] = useState(false);
  const handleUpdateForm = () => {
    isOpenForm(!openForm);
    if (openForm) {
      document.getElementById("updateForm").style.visibility = "visible";
    } else {
      document.getElementById("updateForm").style.visibility = "";
    }
  };







 
  const [initialTodo, UpdatedTodo] = useState({
    id: "",
    task: "",
    description: "",
  });
  useEffect(() => {
    Service.getTodoById(id)
      .then((res) => {
        UpdatedTodo(res.data);
        console.log(initialTodo);
      })
      .catch((err) => console.log(err));
  }, [id]);








  const handleChange = (e) => {
    const { name, value } = e.target;
    UpdatedTodo({ ...initialTodo, [name]: value });
  };







  const handleUpdate = (e) => {
    e.preventDefault();
    Service.updateTodoById(initialTodo.id, initialTodo)
      .then((data) => {
        console.log(data);
       
        
      })
      .catch((err) => console.log(err));
    document.getElementById("updateForm").style.visibility = "";
    window.location.reload();
  };
const handleForm=()=>{
  document.getElementById("updateForm").style.visibility = "";
}




  return (
    <div className="below-section">
    <div className="form1">
      <form id="updateForm" class="form">
        <p class="title"> Update Task </p>
        <p title="close" id='toggle-close' className="btn btn-dark" onClick={handleForm} class="submit">
        X
      </p>
        <p class="message">Do not forget to enter id. It is required.</p>
        <label>
          <input
            required=""
            placeholder=""
            type="number"
            name="id"
            value={initialTodo.id}
            class="input"
            onChange={(e) => handleChange(e)}
          />
          <span>Id:</span>
        </label>
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            name="task"
            value={initialTodo.task}
            class="input"
            onChange={(e) => handleChange(e)}
          />
          <span>Task:</span>
        </label>
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            name="description"
            value={initialTodo.description}
            class="input"
            onChange={(e) => handleChange(e)}
          />
          <span>Description:</span>
        </label>
        <button onClick={(e) => handleUpdate(e)} class="submit">
          Submit
        </button>
       
      </form>
      </div>
      <div className="card">
        <p className="card-title">
          {id}.{todo}
        </p>
        <p className="small-desc">{description}</p>
        <div className="go-corner">
          <div className="go-arrow"></div>
        </div>
        <div className="actions">
          <button className="btn btn-danger m-1" onClick={() => handleDelete(id)}>delete</button>
          <button className="btn btn-warning m-1" onClick={handleUpdateForm}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
