import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";

import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	getDoc,
	orderBy,
	query,
	where,
	updateDoc,
} from "firebase/firestore";

import firebase from 'firebase/app';
import 'firebase/auth';

import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../lib/firebase";

const publicRoutes = ["/login/", "/vytvorit-ucet/", "/view/"];

const Auth = React.createContext();
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

import FullPageLoading from "../components/loading/FullPageLoading";


export default function AuthContext({ children }) {
	const [user, loading, error] = useAuthState(auth);
	const [display, setdisplay] = useState(false);
	const [userData, setuserData] = useState(null);
	const [data, setdata] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [sceletonLoading, setsceletonLoading] = useState(true);
	const [selected, setselected] = useState([]);

	const router = useRouter();


	useEffect(() => {
		if (!loading) {
			if (!user) {
				var isPublic = false;
				publicRoutes.map((r) => {
					if (router.asPath.includes(r)) {
						isPublic = true;
					}
				});
				if (isPublic) {
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
						if (
							snap.data().setup == false &&
							!router.asPath.includes("user-setup")
						)
							router.push("/user-setup/");
						setdisplay(true);
					}
				});

					var newData = [];
					var newSelected = [];
					var collectionRef = collection(firestore, "/offers");
					var q = query(
						collectionRef,
						// orderBy("created", "desc"),
						orderBy("lastModified", "desc"),
						where("userId", "==", user.uid)
					);
					//const query = query(collectionRef,);
					getDocs(q).then((docs) => {
						if (!docs.empty) {
							docs.docs.map((doc) => {								
								newData.push(doc.data());
								newSelected.push(false);
							});
							setdata(newData);
							setselected(newSelected);
						}

						setsceletonLoading(false);
					});

					var Employees = [];
					var collectionRef = collection(firestore, "/employees");
					var q = query(
						collectionRef,
						where("userId", "==", user.uid)
					);
					//const query = query(collectionRef,);
					getDocs(q).then((docs) => {
						if (!docs.empty) {
							docs.docs.map((doc) => {
								console.log(doc.data())
								Employees.push(doc.data());
							});
							setEmployees(Employees);
						}
					});
			}
		}
	}, [user, loading, router]);


	function handleDelete(id) {
		const docRef = doc(firestore, `/offers/${id}`);
		var newData = [...data];
		newData = newData.filter((offer) => offer.id != id);
		setdata(newData);

		deleteDoc(docRef)
			.then((res) => { })
			.catch((err) => {
				// setloading(false);
				console.log(err);
			});
	}

	function updateEmployee(newEmployee){
		const docRef = doc(firestore, `/employees/${newEmployee.id}`);
		updateDoc(docRef, newEmployee)
	}
	
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
		data,
		setdata,
		sceletonLoading,
		selected,
		setselected,
		handleDelete,
		employees,
		setEmployees,
		updateEmployee
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
