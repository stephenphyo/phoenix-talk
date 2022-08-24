import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./FirebaseAuth";

const useFirebaseAuth = () => {

    /* useState */
    const [authData, setAuthData] = useState();

    onAuthStateChanged(firebaseAuth, (authData) => {
        if (authData) {
            setAuthData(authData);
            console.log(authData)
        }
    });

    return authData;
};

export default useFirebaseAuth;