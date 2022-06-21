import { createContext, useState, useContext, useEffect } from "react";
import {auth, db} from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {setDoc, doc} from "firebase/firestore"

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})

    const signUp = (email, password) => {
         createUserWithEmailAndPassword(auth, email, password)
         return setDoc(doc(db, 'users', email), {
            savedCoins: []
         });  
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log(currentUser);
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])



    return (
        <UserContext.Provider value={{signUp, user, logout, signIn}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}