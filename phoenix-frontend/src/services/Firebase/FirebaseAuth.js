import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import FirebaseApp from './FirebaseApp';

const firebaseAuth = getAuth(FirebaseApp);
const firebaseAuthProvider = {
    google: new GoogleAuthProvider(),
};

export { firebaseAuth, firebaseAuthProvider };