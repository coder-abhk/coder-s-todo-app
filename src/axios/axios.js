import Axios from "axios";

export const axios = Axios.create({
  baseURL: "https://coders-todo-app.herokuapp.com",
});
