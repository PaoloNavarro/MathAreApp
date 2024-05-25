import { db } from '../../firebaseConfig';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  getDoc, 
  setDoc, 
  doc, 
  DocumentSnapshot 
} from 'firebase/firestore';

const gamesRef = collection(db, 'games');
const achievementsRef = collection(db, 'achievement');
const usersAchievementsRef = collection(db, 'usersAchievements');
const gamesHistoryRef = collection(db, 'gamesHistory');

// Método para agregar un historial de juego
export const agregarHistorialJuego = async (historial:  Omit<HistorialJuego, 'id'>): Promise<void> => {
  try {
    await addDoc(gamesHistoryRef, historial);
  } catch (error) {
    console.error('Error agregando historial de juego', error);
  }
};

// Método para obtener logros por juego
export const obtenerLogrosPorJuego = async (id_juego: string): Promise<Logro[]> => {
  try {
    const q = query(achievementsRef, where('id_Game', '==', id_juego));
    const querySnapshot = await getDocs(q);
    const logros: Logro[] = [];

    querySnapshot.forEach((doc) => {
      logros.push({ id_logro: doc.id, ...doc.data() } as Logro);
    });

    return logros;
  } catch (error) {
    console.error('Error obteniendo logros por juego', error);
    return [];
  }
};

// Método para agregar un logro a un usuario
export const agregarLogro = async (logro: UsuarioLogro): Promise<void> => {
  try {
    const logroRef = doc(usersAchievementsRef);
    await setDoc(logroRef, logro);
    console.log('logro agregado');
  } catch (error) {
    console.error('Error agregando logro', error);
  }
};

// Método para obtener el historial de juegos de un usuario
export const obtenerHistorialPorUsuarioYJuego = async (id_usuario: string, id_juego: string): Promise<HistorialJuego[]> => {
  try {
    const q = query(gamesHistoryRef, 
                    where('id_users', '==', id_usuario), 
                    where('id_Game', '==', id_juego));
    const querySnapshot = await getDocs(q);
    const historial: HistorialJuego[] = [];
    querySnapshot.forEach((doc) => {
      const historialData = doc.data() as HistorialJuego; // Convertir a HistorialJuego
      historialData.id = doc.id; // Asignar el ID del documento al nuevo campo 'id'
      historial.push(historialData);
    });
    
    return historial;
  } catch (error) {
    console.error('Error obteniendo historial de juegos por usuario y juego', error);
    return [];
  }
};

// Método para buscar logros completos por usuario y juego
export const buscarLogrosCompletosPorUsuarioYJuego = async (idUsuario: string, idJuego: string): Promise<Logro[]> => {
  try {
    // Consulta para obtener los logros del usuario para un juego específico
    const q = query(usersAchievementsRef, 
                    where('id_user', '==', idUsuario),
                    where('id_game', '==', idJuego));
    
    const querySnapshot = await getDocs(q);
    const logrosIds: string[] = [];

    // Obtener los ID de los logros conseguidos por el usuario
    querySnapshot.forEach(doc => {
      const logro = doc.data() as UsuarioLogro;
      const idLogro = logro.id_logro;
      logrosIds.push(idLogro);
    });

    // Ahora buscamos las descripciones de esos logros en la colección 'achievement'
    const logrosCompletos: Logro[] = [];

    for (const idLogro of logrosIds) {
      const logroRef = doc(achievementsRef, idLogro);
      const logroSnapshot = await getDoc(logroRef);
      console.log(logroSnapshot);
      if (logroSnapshot.exists()) {
        const logroData = logroSnapshot.data() as Logro;
        console.log(logroData);
        // Solo incluimos el logro si pertenece al juego especificado
        if (logroData.id_Game === idJuego) {
          logrosCompletos.push({ ...logroData });
        }
      }
    }

    console.log(logrosCompletos);
    return logrosCompletos;
  } catch (error) {
    console.error('Error buscando logros completos por usuario y juego:', error);
    throw error;
  }
};

// Método para verificar si un usuario ha completado un logro
export const verificarLogroCompletoPorUsuarioYLogro = async (idUsuario: string, idLogro: string): Promise<boolean> => {
  try {
    // Consulta para verificar si el usuario ha completado el logro
    const q = query(usersAchievementsRef, 
                    where('id_user', '==', idUsuario),
                    where('id_logro', '==', idLogro));
    
    const querySnapshot = await getDocs(q);

    // Si hay documentos en el resultado de la consulta, significa que el usuario ha completado el logro
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error verificando logro completo por usuario y logro:', error);
    throw error;
  }
};
