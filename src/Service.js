import axios from "axios";
const BASE_URL = "http://localhost:9191";

class Service {
  getTodos() {
    return axios.get(BASE_URL + "/getAllTodos");
  }
  addTodo(data){
    return axios.post(BASE_URL + "/addTodos", data);
  }
   getTodoById(id){
    return axios.get(BASE_URL+"/getTodoById/"+ id);
   }
   deleteTodoById(id){
    return axios.delete(BASE_URL+"/deleteTodoById/"+id);
   }
   updateTodoById(id, data) {
     return axios.post(BASE_URL+"/updateTodoById/"+id , data);
}
}

export default new Service();
