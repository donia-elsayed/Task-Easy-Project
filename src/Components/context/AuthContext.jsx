import React,{useContext, useState,useEffect} from "react"
import {auth,usersCollection} from "../../firebase"
import { createContext } from "react";
export const AuthContext = createContext()
export function useAuth(){
    return  useContext(AuthContext)
}
export function AuthProvider({children}) {
  
    const [currentUser,setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    async function signUp(name,email,password){
        try{
            const res = await auth.createUserWithEmailAndPassword(email, password);
            const user = res.user;
            await usersCollection.add({
                uid: user.uid,
                name,
                authProvider: "local",
                email,
                photoURL:name.charAt(0).toUpperCase()
            });
        }
        catch(err){
            console.error(err);
        }   
    }
    function logIn(email,password){
       return auth.signInWithEmailAndPassword(email,password)
    }
    function logOut(){
        return auth.signOut()
    }
    function resetPassword(email){
        return  auth.sendPasswordResetEmail(email)
    }
    function updateEmail(email){
        return  currentUser.updateEmail(email)
    }
    function updatePassword(password){
        return currentUser.updatePassword(password)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe;
    }, [])
    
    const value ={
        currentUser,
        signUp,
        logIn,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
