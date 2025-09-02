import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  "projectId": "cinesnap-xyfx9",
  "appId": "1:729955019536:web:0307712579b0592da3d395",
  "storageBucket": "cinesnap-xyfx9.firebasestorage.app",
  "apiKey": "AIzaSyA5bu7FmyBNRSgWvCFsoPcnqeOvqQyOBrw",
  "authDomain": "cinesnap-xyfx9.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "729955019536"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
