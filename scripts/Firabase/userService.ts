import { db } from '../../firebaseConfig';
import {  query,where, getDocs,collection} from 'firebase/firestore';

// Obtener la referencia al documento del usuario por su correo electrónico
const userRef = collection(db,'users')
export const getUsersByEmail = async (email: string): Promise<UserInfo | null> => {
    const start = Date.now(); // Obtener el tiempo de inicio
    try {
        // Obtener la colección de usuarios
        const usersCollectionRef = collection(db, 'users');
        
        // Crear una consulta para buscar el usuario por su correo electrónico
        const q = query(usersCollectionRef, where('email', '==', email));
        
        // Ejecutar la consulta
        const querySnapshot = await getDocs(q);
        
        // Verificar si se encontró algún documento
        if (!querySnapshot.empty) {
            // Como el email debería ser único, solo debería haber un documento
            // Obtener el primer documento de la lista
            const userData = querySnapshot.docs[0].data() as UserInfo;
            const end = Date.now(); // Obtener el tiempo de finalización
            console.log('getUsersByEmail time:', end - start, 'milliseconds'); // Imprimir el tiempo transcurrido
            return userData;
        } else {
            // Si no se encontró ningún documento, retornar null
            const end = Date.now(); // Obtener el tiempo de finalización
            console.log('getUsersByEmail time:', end - start, 'milliseconds'); // Imprimir el tiempo transcurrido
            return null;
        }
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir
        console.error('Error al obtener el usuario por correo electrónico:', error);
        return null;
    }
};
