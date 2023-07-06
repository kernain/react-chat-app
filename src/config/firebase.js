import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCaW848WQeJOL2rNjMgIF03xSln3GjXmM",
  authDomain: "chat-app-5af48.firebaseapp.com",
  projectId: "chat-app-5af48",
  storageBucket: "chat-app-5af48.appspot.com",
  messagingSenderId: "507980917175",
  appId: "1:507980917175:web:670170663a7ffeddb6a032"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app)