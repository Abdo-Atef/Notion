// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCFIDhP4STkGGMUx2xWa55zW1zDLhLspSs",
  authDomain: "note-app-a9f93.firebaseapp.com",
  projectId: "note-app-a9f93",
  storageBucket: "note-app-a9f93.appspot.com",
  messagingSenderId: "738184801779",
  appId: "1:738184801779:web:67bf359718921b607fb686"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore();