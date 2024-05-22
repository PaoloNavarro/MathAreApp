import React, { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { buscarLogrosCompletosPorUsuarioYJuego, obtenerLogrosPorJuego } from '@/scripts/Firabase/juegoService';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, useColorScheme } from 'react-native';

interface LogroCompleto {
  id_logro: string;
  descripcion: string;
}

interface Logro {
  id: string;
  description: string;
  id_Game: string;
}

interface LogroGameProps {
  idJuego: string;
}

const LogroGame: React.FC<LogroGameProps> = ({ idJuego }) => {
  const { user } = useAuth();
  const [logrosCompletos, setLogrosCompletos] = useState<LogroCompleto[]>([]);
  const [logrosDisponibles, setLogrosDisponibles] = useState<Logro[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        if (user) {
          setCargando(true);
          const logrosCompletos = await buscarLogrosCompletosPorUsuarioYJuego(user.uid, idJuego);
          const logrosDelJuego = await obtenerLogrosPorJuego(idJuego);
          setLogrosCompletos(logrosCompletos);
          setLogrosDisponibles(logrosDelJuego);
          setCargando(false);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
        setCargando(false);
      }
    };

    cargarDatos();
  }, [user, idJuego]); 

  const cardBackgroundColor = colorScheme === 'dark' ? 'black' : 'white';
  const cardBorderColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <ThemedView style={{ padding: 20, borderRadius: 10, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, margin: 20, backgroundColor: cardBackgroundColor, borderColor: cardBorderColor, borderWidth: 1 }}>
      <ThemedText type='title'>Logros</ThemedText>
      {cargando && <ActivityIndicator size="large" color="#0000ff" />}
      {!cargando && logrosCompletos.length === 0 && logrosDisponibles.length === 0 && (
        <ThemedText>No hay logros disponibles.</ThemedText>
      )}
      {!cargando && (logrosCompletos.length > 0 || logrosDisponibles.length > 0) && (
        <>
          <ThemedText type='subtitle' style={{marginTop:10, marginBottom: 10}}>Logros Completados</ThemedText>
          {logrosCompletos.map((logro, index) => (
            <ThemedView key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="medal" size={24} color="gold" style={{ marginRight: 10 }} />
              <ThemedText>{logro.descripcion}</ThemedText>
            </ThemedView>
          ))}
          <ThemedText type='subtitle' style={{marginTop:10, marginBottom: 10}}>Logros Disponibles</ThemedText>
          {logrosDisponibles.map((logro, index) => (
            <ThemedView key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="medal" size={24} color="silver" style={{ marginRight: 10 }} />
              <ThemedText>{logro.description}</ThemedText>
            </ThemedView>
          ))}
        </>
      )}
    </ThemedView>
  );
};

export default LogroGame;
