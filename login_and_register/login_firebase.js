import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";

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

//google sign in
const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in:", user);
    alert(`Welcome ${user.displayName}`);
  } catch (error) {
    console.error("Error during Google Sign-In:", error.message);
    alert("Failed to sign in. Please try again.");
  }
};

document.getElementById.addEventListener("click", () => {
  var email = document.getElementById("emailInput").value;
  var password = document.getElementById("passwordInput").value;
  logIn(email, password);
});
