import { React, useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

import CreateTodo from "./components/Createtodo";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);
  console.log(todos);

  const handleEdit = async (todo, title, description, date) => {
    // setIsEditing(true);
    await updateDoc(doc(db, "todos", todo.id), {
      title: title,
      description: description,
      date: date,
    });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  if (todos.length === 0) {
    return <h2>Нет записей</h2>;
  }

  return (
    <div className="App">
      <h1>Список дел:</h1>
      <CreateTodo />
      <ul>
        {todos
          .sort((a, b) => (a.date < b.date ? -1 : 1))
          .map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default App;
