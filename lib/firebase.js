// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAqQb5k4KlcvTP1zBBkrNqpNa0ZeJW8OXA",
	authDomain: "cenova-ponuka.firebaseapp.com",
	databaseURL:
		"https://cenova-ponuka-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "cenova-ponuka",
	storageBucket: "cenova-ponuka.appspot.com",
	messagingSenderId: "516585507444",
	appId: "1:516585507444:web:15bcff892f8359e993df21",
	measurementId: "G-E6YTK5Z5CV",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const functions = getFunctions(app);
//connectFunctionsEmulator(functions, "localhost", 5001);

export const firestore = getFirestore(app);
export const auth = getAuth(app);

//connectFirestoreEmulator(firestore, "localhost", 8080);

export const storage = getStorage(app);
