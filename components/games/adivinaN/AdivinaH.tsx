import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { obtenerHistorialPorUsuario } from '@/scripts/Firabase/juegoService';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from 'react-native';

const idJuego = "juegoA1";

interface Historial {
  id: string;
  id_Usuario: string;
  results: {
    intentos: number;
    tiempo: number;
    exitoso: boolean;
    fecha: string;
  };
}

const AdivinaH: React.FC = () => {
  const { user } = useAuth();
  const [historial, setHistorial] = useState<Historial[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        setCargando(true);
        const historialUsuario = await obtenerHistorialPorUsuario(user?.uid);
        setHistorial(historialUsuario);
        setCargando(false);
      } catch (error) {
        console.error('Error cargando historial:', error);
        setCargando(false);
      }
    };

    cargarHistorial();
  }, [user]); // Agrega user como dependencia para que se vuelva a cargar cuando cambie

  // Filtrar solo las últimas 10 entradas del historial
  const ultimas10Historias = historial.slice(-10);

  const cardBackgroundColor = colorScheme === 'dark' ? 'black' : 'white';
  const cardBorderColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <ThemedView  style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : historial.length === 0 ? (
        <ThemedText>No hay historial.</ThemedText>
      ) : (
        <>
          <ThemedView style={styles.header}>
            <ThemedText style={styles.headerText}>Intentos</ThemedText>
            <ThemedText style={styles.headerText}>Tiempo</ThemedText>
            <ThemedText style={styles.headerText}>Éxito</ThemedText>
            <ThemedText style={styles.headerText}>Fecha</ThemedText>
          </ThemedView>
          {ultimas10Historias.map((historia) => (
            <ThemedView key={historia.id} style={styles.row}>
              <ThemedText style={styles.cell}>{historia.results.intentos}</ThemedText>
              <ThemedText style={styles.cell}>{historia.results.tiempo}</ThemedText>
              <ThemedText style={styles.cell}>{historia.results.exitoso ? 'Sí' : 'No'}</ThemedText>
              <ThemedText style={styles.cell}>{historia.results.fecha}</ThemedText>
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
    marginRight:10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    marginRight:10,

  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default AdivinaH;
