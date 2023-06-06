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

import 'firebase/auth';
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../lib/firebase";

import moment from 'moment/moment';



const publicRoutes = ["/login/", "/vytvorit-ucet/", "/view/"];

const Auth = React.createContext();
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import axios from 'axios'


import FullPageLoading from "../components/loading/FullPageLoading";


export default function AuthContext({ children }) {
	const [user, loading, error] = useAuthState(auth);
	const [display, setdisplay] = useState(false);
	const [userData, setuserData] = useState(null);
	const [data, setdata] = useState([]);
	const [excelData, setExcelData] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [sceletonLoading, setsceletonLoading] = useState(true);

	const [selected, setselected] = useState([]);
	const [excelselected, setexcelselected] = useState([]);

	const router = useRouter();



	function load_excel_data(){
		var newData = [];
		var newExcelSelected = [];
		var collectionRef = collection(firestore, "/excels");
		var q = query(
			collectionRef,
			orderBy("lastModified", "desc"),
			where("userId", "==", user.uid)
		);
		//const query = query(collectionRef,);
		getDocs(q).then((docs) => {
			if (!docs.empty) {
				docs.docs.map((doc) => {								
					newData.push(doc.data());
					newExcelSelected.push(false);
				});
				setExcelData(newData);
				setexcelselected(newExcelSelected);
			}
		});
	}

	function load_employee_data(){
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
					Employees.push(doc.data());
				});
				setEmployees(Employees);
			}
		});

	}

	function load_quote_data(){
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
	}

	function user_is_employee(uid){
		var collectionRef = collection(firestore, "/employees");
		var q = query(
			collectionRef,
			where("uid", "==", uid)
		);
		//const query = query(collectionRef,);
		getDocs(q).then((docs) => {
			if (!docs.empty) {
				return true
			}
			return false
		});
	}

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
						logOut();
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

				load_quote_data()
				load_excel_data()
				load_employee_data()
					
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

	function handleDeleteExcel(id){
		const docRef = doc(firestore, `/excels/${id}`);
		var newData = [...excelData];
		newData = newData.filter((offer) => offer.id != id);
		setExcelData(newData);

		deleteDoc(docRef)
			.then((res) => { })
			.catch((err) => {
				// setloading(false);
				console.log(err);
			});
	}

	const fetchImageData = async (name) => {
		try {
		  const imageUrl = `https://ui-avatars.com/api/?name=${name}&size=32&rounded=true&background=random`;
		  const response = await axios.get(imageUrl, {
			responseType: 'arraybuffer',
		  });
		  const imageBuffer = Buffer.from(response.data, 'binary');
		  const base64Image = imageBuffer.toString('base64');
		  return base64Image;
		} catch (error) {
		  console.error('Error downloading the image:', error);
		  return null;
		}
	  };

	async function updateEmployee(newEmployee){
		let img = await fetchImageData(newEmployee.name);
		newEmployee.img = img

		const docRef = doc(firestore, `/employees/${newEmployee.uid}`);
		updateDoc(docRef, newEmployee)

		load_employee_data()
	}

	async function handleEmployeeAdd(name, email, password, setError){

		
		let img = await fetchImageData(name);

		// fetch('http://localhost:8081/create-employee/', {
		fetch('https://api2.nacento.online/create-employee/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
				userId: user != null ? user.uid : "none",
				created: moment().valueOf(),
				status: "Nepotvrdil",
				img: img
		})})
		.then(response => {
			if (!response.ok) {
				return response.json().then(err => Promise.reject(err));
			}
			return response.json();
		})
		.then(data => {
			load_employee_data()
		  })
		.catch((error) => {
			setError(error.message)
		});

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
		updateEmployee, load_employee_data,
		excelselected, setexcelselected,
		excelData, handleDeleteExcel,
		fetchImageData, handleEmployeeAdd,
		user_is_employee
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
