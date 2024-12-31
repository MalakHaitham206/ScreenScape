// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  updatePassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

var notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT5bGRtabhLZwreiU4UWkgtnvAAehc4nc",
  authDomain: "cineverse-9fd98.firebaseapp.com",
  projectId: "cineverse-9fd98",
  storageBucket: "cineverse-9fd98.appspot.com",
  messagingSenderId: "352069782638",
  appId: "1:352069782638:web:6a0f3d7c8d6c61b41fea7f",
  measurementId: "G-FTPS0YDF4H",
};
const app = initializeApp(firebaseConfig); // This must be called first
const auth = getAuth();

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    notyf.success("Account created successfully! Redirecting to login...");
    window.location.href = "./login_page.html"; // Redirect to login page after success
  } catch (error) {
    console.error("Error signing up:", error.message);
    notyf.error(`Error: ${error.message}`);
  }
};

document
  .getElementById("submitButton")
  .addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent form submission

    const submitButton = document.getElementById("submitButton");
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const repassword = document.getElementById("rePasswordInput").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[A-Za-z\d@$!%*?&]{6,}$/;
    const originalContent = submitButton.innerHTML;
    submitButton.innerHTML =
      '<img src="../resources/login_and_register_images/loading.svg" style="height: 20px;">';
    submitButton.disabled = true;
    try {
      if (!emailRegex.test(email)) {
        notyf.error("Please enter a valid email address.");
        return;
      }

      if (!passwordRegex.test(password)) {
        notyf.error(
          "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
        );
        return;
      }
      console.log("Password:", password);
      console.log("Re-Password:", repassword);

      if (password !== repassword) {
        notyf.error("Oops! Your passwords don’t match. Please try again.");
        return;
      }

      await signUp(email, password);
    } catch (error) {
      console.error("Sign-up process failed:", error);
      notyf.error("An unexpected error occurred. Please try again.");
    } finally {
      // Restore the original button content and enable it
      submitButton.innerHTML = originalContent;
      submitButton.disabled = false;
    }
  });
