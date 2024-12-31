// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBT5bGRtabhLZwreiU4UWkgtnvAAehc4nc",
  authDomain: "cineverse-9fd98.firebaseapp.com",
  projectId: "cineverse-9fd98",
  storageBucket: "cineverse-9fd98.appspot.com", // Fixed typo here
  messagingSenderId: "352069782638",
  appId: "1:352069782638:web:6a0f3d7c8d6c61b41fea7f",
  measurementId: "G-FTPS0YDF4H",
};

const app = initializeApp(firebaseConfig); // This must be called first

const auth = getAuth();
const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
};

document
  .getElementById("submitButton")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    console.log("Attempting to log in with:", email, password);
    await logIn(email, password);
    window.location.href = "../index.html";
  });
