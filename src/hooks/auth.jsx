import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Auth = () => {
    const [login, setLogin] = useState(false);
    const [checkState, setCheckState] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLogin(true)
            }
            setCheckState(false)
        })
    })
    return { login, checkState }
}

export default Auth;
