import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxbftAfZz2umkz_1M-udnFVlHTyn-HkIQ",
  authDomain: "umandaditos-chat.firebaseapp.com",
  projectId: "umandaditos-chat",
  storageBucket: "umandaditos-chat.firebasestorage.app",
  messagingSenderId: "219634836770",
  appId: "1:219634836770:web:71cfbdfb3fc7420e80f17b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
