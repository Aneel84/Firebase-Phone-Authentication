import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDLy5bZyOA_wxHUOOuBEVBx7cl8FO3gxw4",
  authDomain: "phone-auth-web-e27eb.firebaseapp.com",
  projectId: "phone-auth-web-e27eb",
  storageBucket: "phone-auth-web-e27eb.firebasestorage.app",
  messagingSenderId: "227544667794",
  appId: "1:227544667794:web:8dd4bba9e928e893bef84b",
  measurementId: "G-RNZ0PYV9FZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
  size: "invisible",
});

function onSignInSubmit() {
  const phoneNumber = document.getElementById("phone").value;
  const appVerifier = window.recaptchaVerifier;
  Swal.fire({
    title: "Sending SMS...",
    didOpen: () => {
      Swal.showLoading();
    },
  });

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: "Please check your phone.",
      });
      window.confirmationResult = confirmationResult;
    })
    .catch((error) => {
      Swal.fire({ icon: "error", title: "SMS Failed", text: error.message });
    });
}
document
  .getElementById("sign-in-button")
  .addEventListener("click", onSignInSubmit);

document.getElementById("verifyBtn").addEventListener("click", () => {
  const code = document.getElementById("otp").value;
  confirmationResult
    .confirm(code)
    .then((result) => {
      Swal.fire({
        icon: "success",
        title: "Verified!",
        text: "Phone authentication successful.",
      });
    })
    .catch((error) => {
      Swal.fire({ icon: "error", title: "Invalid OTP", text: error.message });
    });
});
function logout() {
  signOut(auth)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Signed Out",
        text: "See you again soon!",
        timer: 1500,
        showConfirmButton: false,
      });
    })
    .catch((error) => {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    });
}
document
  .querySelectorAll("#logout")
  .forEach((btn) => btn.addEventListener("click", logout));
