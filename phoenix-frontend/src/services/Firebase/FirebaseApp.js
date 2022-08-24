import { initializeApp } from 'firebase/app';

const FirebaseConfig = {
  apiKey: "AIzaSyCqKMdRIfCO_Y2znifPalBA0W9UePMsDm8",
  authDomain: "phoenix-talk-stephenphyo.firebaseapp.com",
  projectId: "phoenix-talk-stephenphyo",
  storageBucket: "phoenix-talk-stephenphyo.appspot.com",
  messagingSenderId: "361700511491",
  appId: "1:361700511491:web:19667b67407c8166952336",
  measurementId: "G-2JWFM2BXRZ"
};

const FirebaseApp = initializeApp(FirebaseConfig);

export default FirebaseApp;