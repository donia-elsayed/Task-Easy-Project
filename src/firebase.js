import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = app.auth()
export const firestore = firebase.firestore();
export const usersCollection = firestore.collection("users");
export const projectsCollection = firestore.collection("projects");
export const tasksCollection = firestore.collection("tasks");
export const messagesCollection = firestore.collection("messages");

export default app ;