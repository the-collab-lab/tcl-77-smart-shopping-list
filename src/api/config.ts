import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCNcvVYUKCY13rkYYJ70zkIAQYs-M8E_AQ",
	authDomain: "tcl-77-smart-shopping-list.firebaseapp.com",
	projectId: "tcl-77-smart-shopping-list",
	storageBucket: "tcl-77-smart-shopping-list.appspot.com",
	messagingSenderId: "35210747522",
	appId: "1:35210747522:web:e39f63e23150653f0f1e9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
