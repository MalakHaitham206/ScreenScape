// Import the Firebase SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBT5bGRtabhLZwreiU4UWkgtnvAAehc4nc",
  authDomain: "cineverse-9fd98.firebaseapp.com",
  projectId: "cineverse-9fd98",
  storageBucket: "cineverse-9fd98.firebaseapp.com",
  messagingSenderId: "352069782638",
  appId: "1:352069782638:web:6a0f3d7c8d6c61b41fea7f",
  measurementId: "G-FTPS0YDF4H",
};
const app = initializeApp(firebaseConfig); // This must be called first
const auth = getAuth();

const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

const emailInput = document.getElementById("emailInputUpdate");
const submitEmailButton = document.getElementById("submitEmailButtonUpdate");

submitEmailButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    notyf.error("Please enter your email address.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    notyf.success("Password reset email sent. Please check your inbox.");
    setTimeout(() => {
      window.location.href = "./login_page.html";
    }, 2000);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    notyf.error(error.message || "Failed to send password reset email.");
  }
});
