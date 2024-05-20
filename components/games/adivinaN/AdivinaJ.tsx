import React, { useState, useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import AdivinaD from './AdivinaD';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import { obtenerLogrosPorJuego, agregarLogro, agregarHistorialJuego,verificarLogroCompletoPorUsuarioYLogro } from '@/scripts/Firabase/juegoService';
import { useAuth } from '@/contexts/AuthContext';
import { showToastMessage } from '@/components/showToastMessage';

const idJuego = "juegoA1";

interface Logro {
  id: string;
  description: string;
  id_Game: string;
}

const AdivinaJ: React.FC = () => {
  const { user } = useAuth();
  const [number, setNumber] = useState('');
  const [randomNumber, setRandomNumber] = useState(0);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(1);
  const [time, setTime] = useState(0);
  const [guessed, setGuessed] = useState(false);
  const [showDifficultySelection, setShowDifficultySelection] = useState(true);
  const [originalTime, setOriginalTime] = useState(0);
  const colorScheme = useColorScheme();
  const [logros, setLogros] = useState<Logro[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && time > 0 && !guessed) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isGameActive) {
      setMessage(`¡Se acabó el tiempo! El número era ${randomNumber}. ¡Inténtalo de nuevo!`);
      manejarResultado(false);
      setGuessed(true);
      setIsGameActive(false);
    }

    return () => clearInterval(timer);
  }, [time, guessed, isGameActive]);

  useEffect(() => {
    const cargarLogros = async () => {
      try {
        const logrosDelJuego = await obtenerLogrosPorJuego(idJuego);
        setLogros(logrosDelJuego);
      } catch (error) {
        console.error('Error cargando logros:', error);
      }
    };

    cargarLogros();
  }, []);

  const handleStartGame = (maxRange: number, timeLimit: number) => {
    setRandomNumber(Math.floor(Math.random() * maxRange) + 1);
    setTime(timeLimit);
    setGuessed(false);
    setShowDifficultySelection(false);
    setMessage('');
    setAttempts(1);
    setNumber('');
    setOriginalTime(timeLimit);
    setIsGameActive(true);
  };

  const checkNumber = () => {
    const guessedNumber = parseInt(number);
    if (guessedNumber === randomNumber) {
      setMessage(`¡Felicidades! ¡Has adivinado el número ${randomNumber} en ${attempts} intentos!`);
      manejarResultado(true);
      setGuessed(true);
      setIsGameActive(false);
    } else if (guessedNumber < randomNumber) {
      setMessage('El número es mayor.');
    } else {
      setMessage('El número es menor.');
    }
    setAttempts(attempts + 1);
    setNumber('');
  };

  const manejarResultado = (exitoso: boolean) => {
    if (user) {
      const resultado = {
        intentos: attempts,
        tiempo: originalTime - time,
        exitoso: exitoso,
        fecha: new Date().toISOString() // Obtiene la fecha actual y la convierte a formato ISO
      };
  
      agregarHistorialJuego({
        id_users: user.uid,
        results: resultado,
      }).then(() => {
        // Iterar sobre todos los logros independientemente del éxito del juego
        const promesasLogros = logros.map((logro) => {
          // Verificar si el usuario ya ha completado este logro
          return verificarLogroCompletoPorUsuarioYLogro(user.uid, logro.id).then((logroCompletado) => {
            if (!logroCompletado) {
              let logroCumplido = false;
              switch (logro.description) {
                case 'adivinar en un intento':
                  logroCumplido = attempts === 1;
                  break;
                case 'adivinar en 20 segundos':
                  logroCumplido = originalTime - time <= 20; // Corregir condición de tiempo
                  break;
                case 'adivinar en 3 intentos':
                  logroCumplido = attempts <= 3;
                  break;
                case 'adivinar en 10 segundos':
                  logroCumplido = originalTime - time <= 10; // Corregir condición de tiempo
                  break;
              }
  
              if (logroCumplido) {
                return agregarLogro({
                  id_game: idJuego,
                  id_logro: logro.id,
                  id_user: user.uid,
                }).then(() => {
                  return logro.description; // Devolver la descripción del logro para mostrar el toast
                }).catch(error => {
                  console.error('Error al desbloquear logro:', error);
                  return null;
                });
              } else {
                return null; // No hacer nada si el logro no se cumple
              }
            } else {
              return null; // No hacer nada si el logro ya está completado
            }
          });
        });
  
        // Esperar a que todas las promesas de logros se resuelvan
        Promise.all(promesasLogros).then((resultados) => {
          resultados.forEach((descripcion, index) => {
            if (descripcion) {
              setTimeout(() => {
                showToastMessage('success', 'success', '¡Logro desbloqueado! ' + descripcion);
              }, index * 1000); // Escalonar los toasts por 1 segundo
            }
          });
        }).catch(error => {
          console.error('Error al procesar logros:', error);
        });
      }).catch(error => {
        console.error('Error al agregar resultado del juego:', error);
      });
    }
  };
  
  

  const restartGame = () => {
    setShowDifficultySelection(true);
  };

  const cardBackgroundColor = colorScheme === 'dark' ? 'black' : 'white';
  const cardBorderColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <ThemedView >
      {showDifficultySelection ? (
        <AdivinaD onStartGame={handleStartGame} />
      ) : (
        <ThemedView style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ThemedText type='title'>Tiempo restante en segundos:</ThemedText>
          <ThemedText>{time}</ThemedText>

          <ThemedText>{message}</ThemedText>
          <ThemedView style={styles.inputContainer}>
            <ThemedTextInput
              onChangeText={setNumber}
              value={number}
              placeholder="Ingresa un número"
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={checkNumber}
              editable={!guessed}
            />
          </ThemedView>
          <ThemedView style={styles.butonContainer}>
            <Button
              title="Comprobar"
              onPress={checkNumber}
              color="blue"
              disabled={guessed}
            />
          </ThemedView>
          {guessed && (
            <ThemedView style={styles.butonContainer}>
              <Button
                title="Reiniciar"
                onPress={restartGame}
                color="red"
              />
            </ThemedView>
          )}
        </ThemedView>
      )}
      <Toast />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
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
  },
  inputContainer: {
    marginTop: 25,
    marginBottom: 25,
  },
  butonContainer: {
    marginTop: 25,
  },
});

export default AdivinaJ;
