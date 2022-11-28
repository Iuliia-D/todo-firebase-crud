import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import classes from "./Createtodo.module.scss";

function CreateTodo(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        description,
        date,
        completed: false,
      });
      setTitle("");
      setDescription("");
      setDate("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className={classes.input_containers_wrapper}>
      <div className={classes.input_container}>
        <input
          type="text"
          placeholder="Что нужно сделать?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={classes.input_container}>
        <textarea
          type="text"
          placeholder="Подробности"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={classes.input_container}>
        <input
          type="date"
          value={date}
          className={classes.input_date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className={classes.btn_container}>
        <button>Сохранить</button>
      </div>
    </form>
  );
}
export default CreateTodo;
