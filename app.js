import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

 const firebaseConfig = {
    apiKey: "AIzaSyDLy5bZyOA_wxHUOOuBEVBx7cl8FO3gxw4",
    authDomain: "phone-auth-web-e27eb.firebaseapp.com",
    projectId: "phone-auth-web-e27eb",
    storageBucket: "phone-auth-web-e27eb.firebasestorage.app",
    messagingSenderId: "227544667794",
    appId: "1:227544667794:web:8dd4bba9e928e893bef84b",
    measurementId: "G-RNZ0PYV9FZ"
  };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 Setup reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  { size: "invisible" }
);

// 🔹 Send OTP
document.getElementById("sign-in-button").addEventListener("click", () => {
  const phoneNumber = document.getElementById("phone").value;
  const appVerifier = window.recaptchaVerifier;

  if (!phoneNumber) {
    Swal.fire("Error", "Please enter phone number", "error");
    return;
  }

  Swal.fire({
    title: "Sending OTP...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      Swal.fire("Success", "OTP sent successfully", "success");
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
});

// 🔹 Verify OTP
document.getElementById("verifyBtn").addEventListener("click", () => {
  const code = document.getElementById("otp").value;

  if (!code) {
    Swal.fire("Error", "Enter OTP", "error");
    return;
  }

  if (!window.confirmationResult) {
    Swal.fire("Error", "Please request OTP first", "error");
    return;
  }

  window.confirmationResult
    .confirm(code)
    .then(() => {
      Swal.fire("Success", "Phone authentication successful", "success");
    })
    .catch((error) => {
      Swal.fire("Invalid OTP", error.message, "error");
    });
});
