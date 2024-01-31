import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc"
import { toast } from 'react-toastify';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

const Oauth = () => {
    const loacation = useLocation();
    const navigate = useNavigate();

    const onGoogleAuth = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error('Problem with Google auth')
        }
    }
    return (
        <div>
            <h3 className='mt-4 text-center'>Sign{loacation.pathname === "/signin" ? "Up" : "In"} With &nbsp;
                <button onClick={onGoogleAuth} style={{
                    outline: "none",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1px solid black"
                }}> <span>
                        <FcGoogle />
                        oogle
                    </span></button>
            </h3>
        </div>
    );
}

export default Oauth;
