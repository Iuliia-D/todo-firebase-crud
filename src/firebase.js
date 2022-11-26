import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwWoSu1FqElJT1agnsgjauhZrntfx0lJU",
  authDomain: "todo-firebase-crud-16779.firebaseapp.com",
  projectId: "todo-firebase-crud-16779",
  storageBucket: "todo-firebase-crud-16779.appspot.com",
  messagingSenderId: "590782893833",
  appId: "1:590782893833:web:752dc2a83c28c9711a4dd8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
