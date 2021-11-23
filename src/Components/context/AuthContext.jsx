import React,{useContext, useState,useEffect} from "react"
import {auth} from "../../firebase"
import {usersCollection} from "../../firebase"
const AuthContext = React.createContext()
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
        updatePassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
