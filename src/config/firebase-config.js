import { paperClasses } from "@mui/material";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  FacebookAuthProvider,
  AppleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5QjFwO-QoBw0N0AinuG-n7AoWD_lkN8U",
  authDomain: "ezleasing.firebaseapp.com",
  projectId: "ezleasing",
  storageBucket: "ezleasing.appspot.com",
  messagingSenderId: "927628622444",
  appId: "1:927628622444:web:04a2ee73ea4919fc1fb649",
  measurementId: "G-YVHXVBCBF2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);

    const user = res.user;

    console.log("user = ", user);
  } catch (err) {
    console.error(err);
  }
}

const signInWithAppple = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);

    const user = res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// make a function for signing in using an email and password:

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// create a function for registering a user with an email and password:
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = createUserWithEmailAndPassword(auth, email, password)
    const user = res.user;
    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    // });

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// Create a function that will send a password reset link to an email address:
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const logout = () => {
  signOut(auth);
};

export {
  auth,
  googleProvider,
  signInWithFacebook,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};