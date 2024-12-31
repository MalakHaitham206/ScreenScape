import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT5bGRtabhLZwreiU4UWkgtnvAAehc4nc",
  authDomain: "cineverse-9fd98.firebaseapp.com",
  projectId: "cineverse-9fd98",
  storageBucket: "cineverse-9fd98.appspot.com",
  messagingSenderId: "352069782638",
  appId: "1:352069782638:web:6a0f3d7c8d6c61b41fea7f",
  measurementId: "G-FTPS0YDF4H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Notyf for notifications
const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
    notyf.success("You have been logged out successfully!");
    window.location.href = "/login_and_register/login_page.html";
  } catch (error) {
    console.error("Error logging out:", error.message);
    notyf.error("An error occurred while logging out. Please try again.");
  }
};

document.querySelector(".logout .list-link").addEventListener("click", logOut);
