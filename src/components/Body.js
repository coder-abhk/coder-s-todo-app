import React, { useState } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { axios } from "../axios/axios";

export default function Body() {
  const [isShow, setIsShow] = useState(false);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const getTodosHandler = async () => {
    await axios
      .get("/getTodos")
      .then((res) => {
        setTodos([...res.data]);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = async (id) => {
    await axios
      .delete(`/deleteTodo/${id}`)
      .then((res) => {
        setTodos([...res.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitTodoHandler = async () => {
    await axios
      .post("/add", { todo: todo })
      .then((res) => {
        setTodos([...res.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="body__wrapper">
      <div className="form__wrapper">
        <div className="input__wrapper">
          <input
            className="input__field"
            type="text"
            placeholder="write your todo..."
            required
            aria-required
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <AddBoxIcon
            fontSize="large"
            onClick={(e) => {
              todo ? submitTodoHandler() : console.log("empty input!");
              setTodo("");
              e.preventDefault();
            }}
          />
        </div>
      </div>
      <div className="todos__wrapper">
        <div className="show__todos">
          <button
            onClick={(e) => {
              getTodosHandler();
              isShow ? setIsShow(false) : setIsShow(true);
              e.preventDefault();
            }}
          >
            {isShow ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>
        <div className="all__todos">
          {isShow &&
            todos.map((todo) => {
              return (
                <div className="each__todos stagger__added" key={todo.id}>
                  {todo.todo}{" "}
                  <DeleteOutlineIcon
                    onClick={(e) => {
                      deleteHandler(todo.id);
                      e.preventDefault();
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
