// firestoreService.js
import { firestore } from './firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const getUserData = async (userId) => {
  const docRef = doc(firestore, 'users', userId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
  }
};

export const saveUserData = async (userId, data) => {
  const docRef = doc(firestore, 'users', userId);
  try {
    await setDoc(docRef, data);
    console.log('Document successfully written!');
  } catch (error) {
    console.error('Error writing document:', error);
  }
};
