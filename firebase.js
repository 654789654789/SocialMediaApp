// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDnYYmG6bFJSi9WdLjzf7JC6pOXCqYT26E",
  authDomain: "socialmediaapp-807f3.firebaseapp.com",
  projectId: "socialmediaapp-807f3",
  storageBucket: "socialmediaapp-807f3.firebasestorage.app",
  messagingSenderId: "1006092764264",
  appId:"1:1006092764264:web:b6a839e5aa67faacc967dd",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const firestore = getFirestore(app);
export const storage = getStorage(app);
