
import {
  auth,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

document.getElementById("logoutButton").addEventListener("click", logOut);
