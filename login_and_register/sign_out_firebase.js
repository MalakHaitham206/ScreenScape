import { signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

