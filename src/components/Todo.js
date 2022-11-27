import React, { useState } from "react";
// import { uploadFile } from "../storage";
import FileLoader from "./FileLoader";
import { ReactComponent as CheckIcon } from "../icons/check-circle.svg";
import { ReactComponent as CheckDoneIcon } from "../icons/check-circle-done.svg";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";
import { ReactComponent as EditDoneIcon } from "../icons/done.svg";
// import { ReactComponent as Folder } from "../icons/folder_open.svg";

// function Todo(props) {
function Todo({ todo, toggleComplete, handleEdit, handleDelete }) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);
  const [newDate, setNewDate] = useState(todo.date);
  const [btnActive, setBtnActive] = useState(false);
  const [disabled, setDisabled] = useState(true);
  // const [selectedFile, setSelectedFile] = useState("");

  const handleChangeTitle = (e) => {
    e.preventDefault();
    if (todo.completed === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };
  const handleChangeDescr = (e) => {
    e.preventDefault();
    setNewDescription(e.target.value);
  };
  const handleChangeDate = (e) => {
    e.preventDefault();
    setNewDate(e.target.value);
  };
  // const fileChangeHandler = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   uploadFile(selectedFile, todo);
  // };
  const handleActiveBtn = () => {
    btnActive ? setBtnActive(false) : setBtnActive(true);
    disabled ? setDisabled(false) : setDisabled(true);
  };
  // const now = new Date();

  return (
    <li className="todo">
      <button className="button-complete" onClick={() => toggleComplete(todo)}>
        {todo.completed ? <CheckDoneIcon /> : <CheckIcon />}
      </button>
      <input
        style={{ textDecoration: todo.completed && "line-through" }}
        type="text"
        value={todo.title === "" ? newTitle : todo.title}
        className="list"
        disabled={disabled}
        onChange={handleChangeTitle}
      />
      <input
        style={{ textDecoration: todo.completed && "line-through" }}
        type="text"
        value={newDescription || todo.description}
        className="list"
        disabled={disabled}
        onChange={handleChangeDescr}
      />
      <input
        // style={
        //   todo.date <= now ? { borderColor: "red" } : { borderColor: "black" }
        // }
        type="date"
        value={newDate || todo.date}
        className="list"
        disabled={disabled}
        onChange={handleChangeDate}
      />
      <div>
        <button
          className="button-edit"
          onClick={() => {
            handleEdit(todo, newTitle, newDescription, newDate);
            handleActiveBtn();
          }}
        >
          {btnActive ? <EditDoneIcon /> : <EditIcon />}
        </button>

        <button className="button-delete" onClick={() => handleDelete(todo.id)}>
          <DeleteIcon />
        </button>
        <FileLoader todo={todo} />
        {/* <button>
          <label htmlFor="inputFile">
            <Folder />
            <input
              type="file"
              id="inputFile"
              className="file_input"
              onChange={fileChangeHandler}
            />
          </label>
        </button> */}
      </div>
    </li>
  );
}

export default Todo;
