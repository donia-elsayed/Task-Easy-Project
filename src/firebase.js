import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyA1FqQTgiHncmR4KRgxmDmi2ejPaE8tgJc",
    authDomain: "task-easy-dev.firebaseapp.com",
    projectId:"task-easy-dev",
    storageBucket: "task-easy-dev.appspot.com",
    messagingSenderId:"980865948495",
    appId: "1:980865948495:web:947080caf8c13e9bd6433a"
})
export const auth = app.auth();
export const firestore = firebase.firestore();
export const usersCollection = firestore.collection("users");
export const projectsCollection = firestore.collection("projects");
export const tasksCollection = firestore.collection("tasks");
export const messagesCollection = firestore.collection("messages");

export default app ;