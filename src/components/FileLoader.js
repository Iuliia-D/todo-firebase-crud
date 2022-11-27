import React, { useState, useEffect } from "react";
import { storage, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ReactComponent as Done } from "../icons/done.svg";
import { ReactComponent as Link } from "../icons/link.svg";
import { ReactComponent as LinkOf } from "../icons/link_off.svg";
// import { ReactComponent as Folder } from "../icons/folder_open.svg";

function FileLoader({ todo }) {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileURL, setFileURL] = useState("");

  const fileRef = ref(storage, `files/${todo.id}`);

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedFileName(event.target.files[0].name);
  };

  const uploadFile = () => {
    if (selectedFile === "") return;
    uploadBytes(fileRef, selectedFile)
      .then(() => {
        console.log("file uploaded!");
      })
      .catch((error) => {
        console.log("can`t upload file, error" + error);
      });
  };
  const deleteFile = () => {
    deleteObject(fileRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("can`t delete file, error" + error);
      });
  };

  const handleAddFile = async (todo, selectedFileName) => {
    await updateDoc(doc(db, "todos", todo.id), {
      file: true,
      fileName: selectedFileName,
    });
    setSelectedFile("");
  };
  const handleDelteFile = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      file: false,
      fileName: "",
    });
  };

  //   const fileListRef = ref(storage, "files/");
  useEffect(() => {
    getDownloadURL(ref(storage, `files/${todo.id}`))
      .then((url) => setFileURL(url))
      .catch((error) => {
        console.log("unsuccessful, error" + error);
      });
  }, []);

  return (
    <>
      <div className="file_controll">
        {!todo.file && (
          <div className="file_input">
            {/* <label htmlFor="inputFile">
            Select */}
            <input
              type="file"
              id="inputFile"
              className="input"
              onChange={fileChangeHandler}
            />
            {/* </label> */}
            {selectedFile !== "" ? (
              <button
                type="button"
                onClick={() => {
                  uploadFile();
                  handleAddFile(todo, selectedFileName);
                }}
              >
                <Done />
              </button>
            ) : (
              ""
            )}
          </div>
        )}
        {todo.file && (
          <div>
            <a href={fileURL} target="_blank" rel="noreferrer">
              <Link />
              ссылка на файл
            </a>

            <button
              className="btn_file_delete"
              onClick={() => {
                deleteFile();
                handleDelteFile(todo);
              }}
            >
              <LinkOf />
              удалить файл
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default FileLoader;
