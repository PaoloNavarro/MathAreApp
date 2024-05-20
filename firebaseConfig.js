import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAJo9sNa-b8c1L5iLjhjRRDPmpfoog1AF4",
    authDomain: "converapp-4dd08.firebaseapp.com",
    projectId: "converapp-4dd08",
    storageBucket: "converapp-4dd08.appspot.com",
    messagingSenderId: "264352697361",
    appId: "1:264352697361:web:95d5948df18115cea1b5b0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };