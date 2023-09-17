// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBaVMUtvvLQgVOGh76QgIvlqJCxOIV4OYU",
  authDomain: "image-upload-620a5.firebaseapp.com",
  projectId: "image-upload-620a5",
  storageBucket: "image-upload-620a5.appspot.com",
  messagingSenderId: "282831319178",
  appId: "1:282831319178:web:3ac5bf4bfd34e753463d73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)
