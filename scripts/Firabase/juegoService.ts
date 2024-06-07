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

export const agregarHistorialJuego = async (historial: Omit<HistorialJuego, 'id'>): Promise<void> => {
  const start = Date.now();
  try {
    await addDoc(gamesHistoryRef, historial);
    const end = Date.now();
    console.log('agregarHistorialJuego time:', end - start, 'milliseconds');
  } catch (error) {
    console.error('Error agregando historial de juego', error);
  }
};

export const obtenerLogrosPorJuego = async (id_juego: string): Promise<Logro[]> => {
  const start = Date.now();
  try {
    const q = query(achievementsRef, where('id_Game', '==', id_juego));
    const querySnapshot = await getDocs(q);
    const logros: Logro[] = [];

    querySnapshot.forEach((doc) => {
      logros.push({ id_logro: doc.id, ...doc.data() } as Logro);
    });

    const end = Date.now();
    console.log('obtenerLogrosPorJuego time:', end - start, 'milliseconds');
    return logros;
  } catch (error) {
    console.error('Error obteniendo logros por juego', error);
    return [];
  }
};

export const agregarLogro = async (logro: UsuarioLogro): Promise<void> => {
  const start = Date.now();
  try {
    const logroRef = doc(usersAchievementsRef);
    await setDoc(logroRef, logro);
    console.log('logro agregado');
    const end = Date.now();
    console.log('agregarLogro time:', end - start, 'milliseconds');
  } catch (error) {
    console.error('Error agregando logro', error);
  }
};

export const obtenerHistorialPorUsuarioYJuego = async (id_usuario: string, id_juego: string): Promise<HistorialJuego[]> => {
  const start = Date.now();
  try {
    const q = query(gamesHistoryRef, 
                    where('id_users', '==', id_usuario), 
                    where('id_Game', '==', id_juego));
    const querySnapshot = await getDocs(q);
    const historial: HistorialJuego[] = [];

    querySnapshot.forEach((doc) => {
      const historialData = doc.data() as HistorialJuego;
      historialData.id = doc.id;
      historial.push(historialData);
    });
    
    const end = Date.now();
    console.log('obtenerHistorialPorUsuarioYJuego time:', end - start, 'milliseconds');
    return historial;
  } catch (error) {
    console.error('Error obteniendo historial de juegos por usuario y juego', error);
    return [];
  }
};

export const buscarLogrosCompletosPorUsuarioYJuego = async (idUsuario: string, idJuego: string): Promise<Logro[]> => {
  const start = Date.now();
  try {
    const q = query(usersAchievementsRef, 
                    where('id_user', '==', idUsuario),
                    where('id_game', '==', idJuego));
    
    const querySnapshot = await getDocs(q);
    const logrosIds: string[] = [];

    querySnapshot.forEach(doc => {
      const logro = doc.data() as UsuarioLogro;
      const idLogro = logro.id_logro;
      logrosIds.push(idLogro);
    });

    const logrosCompletos: Logro[] = [];

    for (const idLogro of logrosIds) {
      const logroRef = doc(achievementsRef, idLogro);
      const logroSnapshot = await getDoc(logroRef);
      if (logroSnapshot.exists()) {
        const logroData = logroSnapshot.data() as Logro;
        if (logroData.id_Game === idJuego) {
          logrosCompletos.push({ ...logroData });
        }
      }
    }

    const end = Date.now();
    console.log('buscarLogrosCompletosPorUsuarioYJuego time:', end - start, 'milliseconds');
    return logrosCompletos;
  } catch (error) {
    console.error('Error buscando logros completos por usuario y juego:', error);
    throw error;
  }
};

export const verificarLogroCompletoPorUsuarioYLogro = async (idUsuario: string, idLogro: string): Promise<boolean> => {
  const start = Date.now();
  try {
    const q = query(usersAchievementsRef, 
                    where('id_user', '==', idUsuario),
                    where('id_logro', '==', idLogro));
    
    const querySnapshot = await getDocs(q);
    const end = Date.now();
    console.log('verificarLogroCompletoPorUsuarioYLogro time:', end - start, 'milliseconds');
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error verificando logro completo por usuario y logro:', error);
    throw error;
  }
};
