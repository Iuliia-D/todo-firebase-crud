import React, { useState } from "react";

import FileLoader from "./FileLoader";
import { ReactComponent as CheckIcon } from "../icons/check-circle.svg";
import { ReactComponent as CheckDoneIcon } from "../icons/check-circle-done.svg";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";
import { ReactComponent as EditDoneIcon } from "../icons/done.svg";

import classes from "./Todo.module.scss";

function Todo({ todo, toggleComplete, handleEdit, handleDelete }) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);
  const [newDate, setNewDate] = useState(todo.date);
  const [btnActive, setBtnActive] = useState(false);
  const [disabled, setDisabled] = useState(true);

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

  const handleActiveBtn = () => {
    btnActive ? setBtnActive(false) : setBtnActive(true);
    disabled ? setDisabled(false) : setDisabled(true);
  };
  // const now = new Date();

  return (
    <li className={classes.todo}>
      <div className={classes.todo_firstline}>
        <div className={classes.button_complete}>
          <button onClick={() => toggleComplete(todo)}>
            {todo.completed ? <CheckDoneIcon /> : <CheckIcon />}
          </button>
        </div>
        <div>
          <input
            style={{ textDecoration: todo.completed && "line-through" }}
            type="text"
            value={todo.title === "" ? newTitle : todo.title}
            disabled={disabled}
            onChange={handleChangeTitle}
          />
        </div>
      </div>
      <div className={classes.todo_secondline}>
        <div className={classes.todo_date}>
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
        </div>
        <div className={classes.edit_btn}>
          <button
            onClick={() => {
              handleEdit(todo, newTitle, newDescription, newDate);
              handleActiveBtn();
            }}
          >
            {btnActive ? <EditDoneIcon /> : <EditIcon />}
          </button>
        </div>
      </div>
      <div className={classes.textarea_wrapper}>
        <textarea
          style={{ textDecoration: todo.completed && "line-through" }}
          type="text"
          value={newDescription || todo.description}
          className={classes.textarea}
          disabled={disabled}
          onChange={handleChangeDescr}
        />
      </div>
      <div className={classes.delete_btn}>
        <button onClick={() => handleDelete(todo.id)}>
          <DeleteIcon />
        </button>
      </div>
      <div>
        <FileLoader todo={todo} />
      </div>
    </li>
  );
}

export default Todo;
