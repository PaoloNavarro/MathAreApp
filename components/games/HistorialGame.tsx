import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { obtenerHistorialPorUsuarioYJuego } from '@/scripts/Firabase/juegoService';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import useCardColors from '@/constants/CardColors';


interface HistorialGameProps {
  idJuego: string;
  resultConfig: {
    fields: string[];
    labels: string[];
  };
}

const HistorialGame: React.FC<HistorialGameProps> = ({ idJuego, resultConfig }) => {
  const { user } = useAuth();
  const [historial, setHistorial] = useState<HistorialJuego[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const { cardBackgroundColor, cardBorderColor } = useCardColors();

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        if (user) {
          setCargando(true);
          const historialUsuario = await obtenerHistorialPorUsuarioYJuego(user.uid, idJuego);
          setHistorial(historialUsuario);
          setCargando(false);
        }
      
      } catch (error) {
        console.error('Error cargando historial:', error);
        setCargando(false);
      }
    };

    cargarHistorial();
  }, [user, idJuego]);

  // Filtrar solo las últimas 10 entradas del historial
  const ultimas10Historias = historial.slice(-10);

  

  return (
    <ThemedView style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : historial.length === 0 ? (
        <ThemedText>No hay historial.</ThemedText>
      ) : (
        <>
          <ThemedView style={styles.header}>
            {resultConfig.labels.map((label, index) => (
              <ThemedText key={index} style={styles.headerText}>{label}</ThemedText>
            ))}
          </ThemedView>
          {ultimas10Historias.map((historia) => (
            <ThemedView key={historia.id} style={styles.row}>
              {resultConfig.fields.map((field, index) => (
                <ThemedText key={index} style={styles.cell}>
                  {typeof historia.results[field] === 'boolean'
                    ? historia.results[field] ? 'Sí' : 'No'
                    : historia.results[field]}
                </ThemedText>
              ))}
            </ThemedView>
          ))}
        </>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    elevation: 4, // for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 20,
    borderWidth: 1, // Add border width for the card
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    marginRight: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default HistorialGame;
