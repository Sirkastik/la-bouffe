import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	doc,
	collection,
	setDoc,
	addDoc,
	onSnapshot,
	getDoc,
	getDocs,
	deleteDoc,
	query,
	where,
	enableIndexedDbPersistence,
} from "firebase/firestore";
import {
	getAuth,
	GoogleAuthProvider,
	updateProfile,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				unsubscribe();
				resolve(user);
			},
			reject
		);
	});
};

enableIndexedDbPersistence(db).catch((err) => {
	if (err.code == "failed-precondition")
		console.log(
			"Multiple tabs open, persistence can only be enabled in one tab at a a time."
		);
	else if (err.code == "unimplemented")
		console.log(
			"The current browser does not support all of the features required to enable persistence"
		);
});

export {
	auth,
	db,
	provider,
	doc,
	collection,
	setDoc,
	addDoc,
	getDoc,
	getDocs,
	deleteDoc,
	query,
	where,
	onSnapshot,
	updateProfile,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	getCurrentUser,
};
