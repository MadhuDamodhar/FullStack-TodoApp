import axios from "axios";

// Define your base URL directly in the code
const BASE_URL = "https://3.110.221.199:9099";

class Service {
  getTodos() {
    return axios.get(`${BASE_URL}/getAllTodos`);
  }

  addTodo(data) {
    return axios.post(`${BASE_URL}/addTodos`, data);
  }

  getTodoById(id) {
    return axios.get(`${BASE_URL}/getTodoById/${id}`);
  }

  deleteTodoById(id) {
    return axios.delete(`${BASE_URL}/deleteTodoById/${id}`);
  }

  updateTodoById(id, data) {
    return axios.post(`${BASE_URL}/updateTodoById/${id}`, data);
  }
  updateComplte(id, data) {
    return axios.post(`${BASE_URL}/updateComplete/${id}`, data);
  }
}

export default new Service();
