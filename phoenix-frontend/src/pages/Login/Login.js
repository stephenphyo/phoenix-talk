import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* CSS Imports */
import './Login.css';

/*** Component Imports ***/
/* Form Components */
import InputText from 'components/form/SPInputText/SPInputText';

/* Hook Imports */
import useAuth from 'hooks/useAuth';

/* API Imports */
import Axios from 'apis/Axios';

/* Firebase Imports */
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, firebaseAuthProvider } from 'services/Firebase/FirebaseAuth';
import useFirebaseAuth from 'services/Firebase/useFirebaseAuth';

function Login() {

    /* Initialization */
    const dataInitialState = {
        email: '', password: ''
    };

    /* useState */
    const [data, setData] = useState(dataInitialState);

    /* useNavigate */
    const navigate = useNavigate();

    /* useLocation */
    const location = useLocation();
    const from = location.state?.from?.pathname || '/rooms';

    /* Custom Hooks */
    const { setAuth } = useAuth();

    /* Functions */
    const login = () => {
        Axios.post('/users/login', data, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200 && res.data.success) {
                    setAuth(res.data.data);
                    setData(dataInitialState);
                    navigate(from);
                }
            })
    };

    // const login = () => {
    //     console.log(firebaseAuth);
    //     signInWithPopup(firebaseAuth, firebaseAuthProvider.google)
    //         .catch((err) => { console.log(err.message) })
    // };

    return (
        <section className='login'>
            <InputText
                label='Email Address'
                placeholder='Enter email address'
                value={data.email}
                style={{borderFocusColor: 'var(--secondary-color)'}}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && login()}
            />
            <InputText
                label='Password'
                placeholder='Enter password'
                value={data.password}
                style={{borderFocusColor: 'var(--secondary-color)'}}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && login()}
            />
            <button onClick={() => login()}>
                LOGIN
            </button>
        </section>
    );
}

export default Login;