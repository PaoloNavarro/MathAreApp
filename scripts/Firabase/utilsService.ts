import { db } from '../../firebaseConfig';
import {  doc, getDoc } from 'firebase/firestore';

const getConversionsFromFirestore = async (): Promise<Conversions> => {
  const start = Date.now();
  try {
    const conversionsDocRef = doc(db, 'utils', 'conversions');
    const conversionsDoc = await getDoc(conversionsDocRef);

    if (conversionsDoc.exists()) {
      const conversionsData = conversionsDoc.data() as Conversions;
      console.log(conversionsData);
      const end = Date.now();
      console.log('getConversionsFromFirestore time:', end - start, 'milliseconds');
      return conversionsData;
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error('Error fetching conversions from Firestore:', error);
    throw error;
  }
};

const getAreaFromFirestore = async (): Promise<Areas> => {
  const start = Date.now();
  try {
    const areaDocRef = doc(db, 'utils', 'areas');
    const areaDoc = await getDoc(areaDocRef);

    if (areaDoc.exists()) {
      const areaData = areaDoc.data() as Areas;
      const end = Date.now();
      console.log('getAreaFromFirestore time:', end - start, 'milliseconds');
      return areaData;
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error('Error fetching areas from Firestore:', error);
    throw error;
  }
};

const getTrigonometryFromFirestore = async (): Promise<TrigonometryData> => {
  const start = Date.now();
  try {
    const docRef = doc(db, 'utils', 'trigonometria');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const trigonometryData = docSnap.data() as TrigonometryData;
      const end = Date.now();
      console.log('getTrigonometryFromFirestore time:', end - start, 'milliseconds');
      return trigonometryData;
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error('Error fetching trigonometry data:', error);
    throw error;
  }
};

export {getConversionsFromFirestore,getAreaFromFirestore,getTrigonometryFromFirestore };