  console.log("AUTH LOADED");

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence
  } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyA_GnE6EKZdxem2XUHpgMuub2gPj3_PFgM",

  authDomain: "sakuraq-b7f96.firebaseapp.com",

  projectId: "sakuraq-b7f96",

  storageBucket: "sakuraq-b7f96.firebasestorage.app",

  messagingSenderId: "1069498952404",

  appId: "1:1069498952404:web:34daf6db0244513bda6941",

  measurementId: "G-L7BZVP9WRR"

};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const el = {
    googleLoginBtn: document.getElementById("googleLoginBtn"),
    logoutBtn: document.getElementById("logoutBtn"),
    userBox: document.getElementById("userBox"),
    userPhoto: document.getElementById("userPhoto"),
    userName: document.getElementById("userName"),
    userEmail: document.getElementById("userEmail")
  };

  function renderSignedOut() {
    el.googleLoginBtn.hidden = false;
    el.logoutBtn.hidden = true;
    el.userBox.hidden = true;

    el.userPhoto.src = "";
    el.userName.textContent = "Guest";
    el.userEmail.textContent = "";
  }

  function renderSignedIn(user) {
    el.googleLoginBtn.hidden = true;
    el.logoutBtn.hidden = false;
    el.userBox.hidden = false;

    el.userPhoto.src = user.photoURL || "";
    el.userName.textContent = user.displayName || "No name";
    el.userEmail.textContent = user.email || "";
  }

  async function loginWithGoogle() {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google login error:", error.code, error.message, error);

      if (error.code === "auth/popup-blocked") {
        alert("Popup ถูกบล็อกโดย browser");
        return;
      }

      if (error.code === "auth/unauthorized-domain") {
        alert("Domain นี้ยังไม่ได้เพิ่มใน Firebase Authorized Domains");
        return;
      }

      alert(`Login failed: ${error.code}`);
    }
  }

  async function logoutNow() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed");
    }
  }

  onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user);
    if (user) {
      renderSignedIn(user);
    } else {
      renderSignedOut();
    }
  });

  el.googleLoginBtn?.addEventListener("click", loginWithGoogle);
  el.logoutBtn?.addEventListener("click", logoutNow);