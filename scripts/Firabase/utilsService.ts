import { db } from '../../firebaseConfig';
import {  doc, getDoc } from 'firebase/firestore';

  //metodo extraer datos de conversiones
 
  const getConversionsFromFirestore = async (): Promise<Conversions> => {
    try {
      const conversionsDocRef = doc(db, 'utils', 'conversions');
      const conversionsDoc = await getDoc(conversionsDocRef);
  
      if (conversionsDoc.exists()) {
        const conversionsData = conversionsDoc.data() as Conversions;
        console.log(conversionsData)
        return conversionsData;
      } else {
        throw new Error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching conversions from Firestore:', error);
      throw error;
    }
  };

  //metodo para extraer datos de areas.
  

  const getAreaFromFirestore = async (): Promise<Areas> => {
    try {
      const areaDocRef = doc(db, 'utils', 'areas');
      const areaDoc = await getDoc(areaDocRef);
  
      if (areaDoc.exists()) {
        const areaData = areaDoc.data() as Areas;
        return areaData;
      } else {
        throw new Error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching areas from Firestore:', error);
      throw error;
    }
  };
  //trigonometria obtenerlas

  
   const getTrigonometryFromFirestore = async (): Promise<TrigonometryData> => {
    try {
      const docRef = doc(db, 'utils', 'trigonometria');
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return docSnap.data() as TrigonometryData;
      } else {
        throw new Error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching trigonometry data:', error);
      throw error;
    }
  };
export {getConversionsFromFirestore,getAreaFromFirestore,getTrigonometryFromFirestore };