import axios from "@/plugins/axios";

class Todo {
  getTodoList() {
    return axios
      .get("todos")
      .then((response) => {
        if (response?.data) {
          return response.data;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  addTodo(data) {
    return axios
      .post("todos", data)
      .then((response) => {
        if (response?.data) {
          return response.data;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}

const todoApi = new Todo();

export default todoApi;
