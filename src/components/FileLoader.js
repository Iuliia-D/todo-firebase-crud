import React, { useState, useEffect } from "react";
import { storage, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { ReactComponent as Folder } from "../icons/folder_open.svg";

function FileLoader({ todo }) {
  const [selectedFile, setSelectedFile] = useState("");
  const [fileURL, setFileURL] = useState("");

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileRef = ref(storage, `files/${todo.id}`);
  const uploadFile = () => {
    if (selectedFile === "") return;
    uploadBytes(fileRef, selectedFile).then(() => {
      console.log("file upload!");
    });
  };

  const handleAddFile = async (todo, file) => {
    await updateDoc(doc(db, "todos", todo.id), {
      file: true,
    });
  };

  const fileListRef = ref(storage, "files/");
  useEffect(() => {
    getDownloadURL(ref(storage, `files/${todo.id}`))
      .then((url) => setFileURL(url))
      .catch((error) => {
        console.log("unsuccessful, error" + error);
      });
  }, []);

  return (
    <>
      {/* <label htmlFor="inputFile"> */}
      {/* <Folder /> */}
      <input
        type="file"
        id="inputFile"
        className="file_input"
        onChange={fileChangeHandler}
      />
      {/* </label> */}
      <button
        onClick={() => {
          uploadFile();
          handleAddFile(todo);
        }}
      >
        Upload
      </button>
      {todo.file && (
        <a href={fileURL} target="_blank" rel="noreferrer">
          File
        </a>
      )}
    </>
  );
}

export default FileLoader;
