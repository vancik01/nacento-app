import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../lib/firebase";

const publicRoutes = ["/login/", "/vytvorit-ucet/"];

const Auth = React.createContext();
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import FullPageLoading from "../components/loading/FullPageLoading";
export default function AuthContext({ children }) {
	const [user, loading, error] = useAuthState(auth);
	const [display, setdisplay] = useState(false);
	const [userData, setuserData] = useState(null);
	const router = useRouter();
	useEffect(() => {
		console.log(router.asPath);

		if (!loading) {
			if (!user) {
				if (publicRoutes.includes(router.asPath)) {
					setdisplay(true);
				} else {
					router.push("/login");
				}
			} else {
				const docRef = doc(firestore, `/users/${user.uid}`);
				getDoc(docRef).then((snap) => {
					if (!snap.exists()) {
						console.log("User do not exist");
						// logOut();
					} else {
						setuserData(snap.data());
						if (snap.data().setup == false) router.push("/user-setup/");
						setdisplay(true);
					}
				});
				//setdisplay(true);
			}
		}
	}, [user, loading, router]);

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
		userData,
	};

	return (
		<Auth.Provider value={value}>
			{display ? (
				children
			) : (
				<div>
					<FullPageLoading loading={true}></FullPageLoading>
				</div>
			)}
		</Auth.Provider>
	);
}

export function useAuth() {
	return useContext(Auth);
}

function ErrorUser() {
	return <button onClick={signOut}></button>;
}
