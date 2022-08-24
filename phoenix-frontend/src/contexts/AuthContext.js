import { useState, createContext } from 'react';

/* Context */
const AuthContext = createContext();
export default AuthContext;

/* Context Provider */
export const AuthContextProvider = (props) => {

    /* useState */
    const [auth, setAuth] = useState({});

    /* Context Values */
    const value = {
        auth, setAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
};