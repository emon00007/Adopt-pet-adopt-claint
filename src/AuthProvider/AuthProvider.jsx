import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";



export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const githubProvider = new GithubAuthProvider()
    const googleProvider = new GoogleAuthProvider()

    const axiosPublic= useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    const githubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
    }

    const LogOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    };


    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser) ;
        
            if(currentUser){
                // console.log(currentUser);
                const userInfo = {email : currentUser.email}
                axiosPublic.post('/jwt', userInfo) 
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false) ;
                    }
                })
            } else{
                localStorage.removeItem('access-token') ;
                setLoading(false) ;
            }
        });
        return () => {
            unsubscribe() ;
        }
    }, [axiosPublic])

    const AuthInfo = {
        user,
        loading,
        createUser,
        signIn,
        LogOut,
        updateUserProfile,
        googleSignIn,
        githubSignIn
    };

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
