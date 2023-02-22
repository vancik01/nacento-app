import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../lib/firebase";

const Auth = React.createContext();
import { GoogleAuthProvider } from "firebase/auth";
export default function AuthContext({ children }) {
	const [user, loading, error] = useAuthState(auth);
	console.log(user);

	function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	}

	function loginWithEmailAndPassword(email, pass) {
		return signInWithEmailAndPassword(auth, email, pass);
	}

	function createUser(email, pass) {
		return createUserWithEmailAndPassword(auth, email, pass);
	}

	function logOut() {
		return signOut(auth);
	}

	const value = {
		signInWithGoogle,
		loginWithEmailAndPassword,
		createUser,
		logOut,
		user,
		loading,
	};

	return <Auth.Provider value={value}>{children}</Auth.Provider>;
}

export function useAuth() {
	return useContext(Auth);
}
