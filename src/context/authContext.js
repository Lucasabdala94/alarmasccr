import { createContext,useContext,useEffect, useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut,GoogleAuthProvider,signInWithPopup,sendPasswordResetEmail}  from 'firebase/auth';
import { auth } from "../firebase";


export const authContext= createContext();


export const useAuth= ()=>{
    const context=useContext(authContext);
    if(!context) throw new Error('There is not auth provider')
    return context;
}


export function AuthProvider({children}){
    const[user,setUser]=useState(null);
   
    const signup=(email,password)=> createUserWithEmailAndPassword(auth,email,password);
    
    const login= (email,password)=> signInWithEmailAndPassword(auth,email,password);

    const logout= ()=> signOut(auth);

    const loginWithGoogle= ()=>{
        const GoogleProvider= new GoogleAuthProvider();
        return signInWithPopup(auth,GoogleProvider)
    }
    const resetPassword= (email)=>{
        sendPasswordResetEmail(auth,email)
    }

    useEffect(()=>{
        onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
        })
    },[])

    return(
        <authContext.Provider value={{signup,login,user,logout,loginWithGoogle,resetPassword}}>
            {children}
        </authContext.Provider>
    )
}