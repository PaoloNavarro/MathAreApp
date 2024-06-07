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
  const start = Date.now();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const end = Date.now();
    console.log('Login time:', end - start, 'milliseconds');
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

export const register = async (userInfo: UserInfo, password: string): Promise<void> => {
  const start = Date.now();
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, userInfo.email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), userInfo);
    const end = Date.now();
    console.log('Registration time:', end - start, 'milliseconds');
  } catch (error) {
    console.error('Registration error', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  const start = Date.now();
  try {
    await signOut(auth);
    const end = Date.now();
    console.log('Logout time:', end - start, 'milliseconds');
  } catch (error) {
    console.error('Logout error', error);
    throw error;
  }
};
