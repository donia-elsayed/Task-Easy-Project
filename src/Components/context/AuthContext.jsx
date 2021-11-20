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
    async function signUp(email,name,password){
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await usersCollection.add({
          uid: user.uid,
          email,
          name,
          authProvider: "local",
          
        });
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
    function updateUsername(username){
        return currentUser.updateUsername(username)
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
        updateUsername
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
