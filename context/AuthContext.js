import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";

import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

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
import { auth, firestore, storage } from "../lib/firebase";
import moment from 'moment/moment';
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import axios from 'axios';
import FullPageLoading from "../components/loading/FullPageLoading";
import { times } from "lodash";


const publicRoutes = ["/login/", "/vytvorit-ucet/", "/view/"];
const Auth = React.createContext();

export default function AuthContext({ children }) {
	const [user, loading, error] = useAuthState(auth);
	const [display, setdisplay] = useState(false);
	const [userData, setuserData] = useState(null);

	const [data, setdata] = useState([]);
	const [excelData, setExcelData] = useState([]);
	const [sites, setSites] = useState([]);

	const [employees, setEmployees] = useState([]);
	const [ activeItem, setActiveItem ] = useState(-1);

	const [sceletonLoading, setsceletonLoading] = useState(true);

	const router = useRouter();


	function load_collection_data(collection_name, setData){
		var newData = [];
		var collectionRef = collection(firestore, `/${collection_name}`);

		let orderByName = "lastModified"
		if(collection_name == "sites" || collection_name == "employees") orderByName = "created"

		var q = query(
			collectionRef,
			orderBy(orderByName, "desc"),
			where("userId", "==", user.uid)
		);
		
		setsceletonLoading(true);

		getDocs(q).then((docs) => {
			if (!docs.empty) {
				docs.docs.map((doc) => {								
					newData.push(doc.data());
				});
				setData(newData);
				setsceletonLoading(false);
			}
		});
	}


	function load_user_data(){
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

				load_user_data()

				load_collection_data("offers", setdata)
				load_collection_data("excels", setExcelData)
				load_collection_data("sites", setSites)
				load_collection_data("employees", setEmployees)	
					
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

	function handleDeleteDocument(collection_name, id) {
		const docRef = doc(firestore, `/${collection_name}/${id}`);
		deleteDoc(docRef)
		.then((res) => { })
		.catch((err) => {
			// setloading(false);
			console.log(err);
		});

		let newData, setNewData;
		if(collection_name == "offers") {
			newData = [...data];
			setNewData = setdata;
		}
		else if(collection_name == "excels") {
			newData = [...excelData];
			setNewData = setExcelData;
		}
		else if(collection_name == "sites") {
			newData = [...sites];
			setNewData = setSites;
		}

		newData = newData.filter((offer) => offer.id != id);
		setNewData(newData);
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

	const fetchImageData = async (name, size) => {
		try {
		  const imageUrl = `https://ui-avatars.com/api/?name=${name}&size=${size}&rounded=true&background=random`;
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
		// let img = await fetchImageData(name, 48);
		// let largeImg = await fetchImageData(name, 256);

		// let url = uploadEmployeeImage(file, employee, 48)

		// fetch('http://localhost:8080/create-employee/', {
		await fetch('https://api2.nacento.online/create-employee/', {
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
				// img: img,
				// largeImg: largeImg,
		})})
		.then(response => {
			if (!response.ok) {
				return response.json().then(err => Promise.reject(err));
			}
			return response.json();
		})
		.then(data => {
			load_collection_data("employees", setEmployees)
		  })
		.catch((error) => {
			setError(error.message)
		});

	}

	async function uploadImage(file, folder) {
		const timestamp = Date.now();
		const storageRef = ref(storage, `/users/${user.uid}/${folder}/${timestamp}_${file.name}`);

		const snapshot = await uploadBytes(storageRef, file);
  		const url = await getDownloadURL(snapshot.ref);

		return url
	}


	async function uploadSiteCaption(file, site) {
		const storageRef = ref(storage, `/users/${user.uid}/sites/${site.id}/caption.png`);

		const snapshot = await uploadBytes(storageRef, file);
  		const url = await getDownloadURL(snapshot.ref);

		return url
	}

	function deleteSite(site) {
		const docRef = doc(firestore, `/sites/${site.id}`);
		deleteDoc(docRef)
		.then((res) => { })
		.catch((err) => {
			// setloading(false);
			console.log(err);
		});

		let newData = [...sites];
		newData = newData.filter((data) => data.id != site.id);
		setSites(newData);

		const storageRef = ref(storage, `/users/${user.uid}/sites/${site.id}/caption.png`);
		deleteObject(storageRef).then(() => {
			console.log('File deleted successfully');
		  }).catch((error) => {
			console.error('Failed to delete file', error);
		  });
	}


	async function updateDocument(collection, document, object){
		try {
			const docRef = doc(firestore, `/${collection}/${document}`);
			await updateDoc(docRef, object)

		} catch (error) {
			console.log(error);
			toast("Vyskytla sa chyba pri ukladaní záznamu", { type: "error" });
		}
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
		handleDelete,
		employees,
		setEmployees,
		updateEmployee,
		excelData, handleDeleteExcel,
		fetchImageData, handleEmployeeAdd,
		user_is_employee,
		sites, setSites, load_collection_data,

		activeItem, setActiveItem,

		handleDeleteDocument, uploadImage,

		uploadSiteCaption, deleteSite,
		updateDocument
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
