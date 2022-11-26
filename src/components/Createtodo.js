import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

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
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          placeholder="Что нужно сделать?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Подробности"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="btn-container">
        <button>Сохранить</button>
      </div>
    </form>
  );
}
export default CreateTodo;
