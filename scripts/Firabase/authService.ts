// authService.ts
import { auth, db } from '../../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  UserCredential 
} from 'firebase/auth';
import { 
  doc, 
  setDoc 
} from 'firebase/firestore';


export const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Login error', error);
    throw error; // Arroja el error para que pueda ser manejado por el llamador
  }
};

export const register = async (userInfo: UserInfo, password: string): Promise<void> => {
  try {
    // Registrar el usuario en Firebase Authentication
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, userInfo.email, password);
    const user = userCredential.user;

    // Guardar información adicional en Firestore
    await setDoc(doc(db, 'users', user.uid), userInfo);
  } catch (error) {
    console.error('Registration error', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error', error);
    throw error; // Arroja el error para que pueda ser manejado por el llamador
  }
};