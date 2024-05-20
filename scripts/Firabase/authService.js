// authService.js
import { auth,db } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Login error', error);
    throw error; // Arroja el error para que pueda ser manejado por el llamador
  }
};

export const register = async (email, password, gender, phoneNumber, age) => {
  try {
    // Registrar el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar información adicional en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      gender,
      phoneNumber,
      age,
    });
  } catch (error) {
    console.error('Registration error', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error', error);
    throw error; // Arroja el error para que pueda ser manejado por el llamador
  }
};
