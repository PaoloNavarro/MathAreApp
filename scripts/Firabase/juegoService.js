import { db } from '../../firebaseConfig';
import { collection, addDoc, query, where, getDocs,getDoc, setDoc, doc } from 'firebase/firestore';

const gamesRef = collection(db, 'games');
const achievementsRef = collection(db, 'achievement');
const usersAchievementsRef = collection(db, 'usersAchievements');
const gamesHistoryRef = collection(db, 'gamesHistory');

// Método para agregar un historial de juego
export const agregarHistorialJuego = async (historial) => {
  try {
    await addDoc(gamesHistoryRef, historial);
  } catch (error) {
    console.error('Error agregando historial de juego', error);
  }
};

// Método para obtener logros por juego
export const obtenerLogrosPorJuego = async (id_juego) => {
  try {
    const q = query(achievementsRef, where('id_Game', '==', id_juego));
    const querySnapshot = await getDocs(q);
    const logros = [];

    querySnapshot.forEach((doc) => {
      logros.push({ id: doc.id, ...doc.data() });
    });

    return logros;
  } catch (error) {
    console.error('Error obteniendo logros por juego', error);
    return [];
  }
};

// Método para agregar un logro a un usuario
export const agregarLogro = async (logro) => {
  try {
    const logroRef = doc(usersAchievementsRef);
    await setDoc(logroRef, logro);
    console.log('logro agregado')
  } catch (error) {
    console.error('Error agregando logro', error);
  }
};

// Método para obtener el historial de juegos de un usuario
export const obtenerHistorialPorUsuario = async (id_usuario) => {
  try {
    const q = query(gamesHistoryRef, where('id_users', '==', id_usuario));
    const querySnapshot = await getDocs(q);
    const historial = [];
    querySnapshot.forEach((doc) => {
      historial.push({ id: doc.id, ...doc.data() });
    });
    return historial;
  } catch (error) {
    console.error('Error obteniendo historial de juegos por usuario', error);
    return [];
  }
};




export const buscarLogrosCompletosPorUsuarioYJuego = async (idUsuario, idJuego) => {
  try {
    // Consulta para obtener los logros del usuario para un juego específico
    const q = query(usersAchievementsRef, 
                    where('id_user', '==', idUsuario),
                    where('id_game', '==', idJuego));
    
    const querySnapshot = await getDocs(q);
    const logrosIds = [];

    // Obtener los ID de los logros conseguidos por el usuario
    querySnapshot.forEach(doc => {
      const logro = doc.data();
      const idLogro = logro.id_logro;
      logrosIds.push(idLogro);
    });

    // Ahora buscamos las descripciones de esos logros en la colección 'achievement'
    const logrosCompletos = [];

    for (const idLogro of logrosIds) {
      const logroRef = doc(achievementsRef, idLogro);
      const logroSnapshot = await getDoc(logroRef);
      console.log(logroSnapshot)
      if (logroSnapshot.exists()) {
        const logroData = logroSnapshot.data();
        console.log(logroData)
        // Solo incluimos el logro si pertenece al juego especificado
        if (logroData.id_Game === idJuego) {
          const descripcion = logroData.description;
          logrosCompletos.push({ id_logro: idLogro, descripcion });
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

export const verificarLogroCompletoPorUsuarioYLogro = async (idUsuario, idLogro) => {
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
