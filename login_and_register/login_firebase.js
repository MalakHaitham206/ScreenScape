import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Initialize Notyf for notifications
const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyBT5bGRtabhLZwreiU4UWkgtnvAAehc4nc",
  authDomain: "cineverse-9fd98.firebaseapp.com",
  projectId: "cineverse-9fd98",
  storageBucket: "cineverse-9fd98.appspot.com",
  messagingSenderId: "352069782638",
  appId: "1:352069782638:web:6a0f3d7c8d6c61b41fea7f",
  measurementId: "G-FTPS0YDF4H",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);

    notyf.success("Login successful!");

    window.location.href = "../index.html";
  } catch (error) {
    console.error("Error logging in:", error.message);

    notyf.error(`Login failed: invalid email or password.`);
  }
};

document
  .getElementById("submitButton")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission

    const submitButton = document.getElementById("submitButton");
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const originalContent = submitButton.innerHTML;

    if (!email || !password) {
      notyf.error("Please enter both email and password.");
      return;
    }

    submitButton.innerHTML =
      '<img src="../resources/login_and_register_images/loading.svg" style="height: 20px;">';
    submitButton.disabled = true;

    console.log("Attempting to log in with:", email, password);
    try {
      await logIn(email, password); // Call the logIn function
    } catch (error) {
      console.error("An error occurred during login:", error);
    } finally {
      // Restore the original button content and enable it
      submitButton.innerHTML = originalContent;
      submitButton.disabled = false;
    }
  });
