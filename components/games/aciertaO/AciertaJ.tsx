import React, { useState, useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/contexts/AuthContext';
import { showToastMessage } from '@/components/showToastMessage';
import AciertaD from './AciertaD';
import { obtenerLogrosPorJuego, agregarLogro, agregarHistorialJuego, verificarLogroCompletoPorUsuarioYLogro } from '@/scripts/Firabase/juegoService';
import useCardColors from '@/constants/CardColors';

const idJuego = "juegoA2";

const AciertaJ: React.FC = () => {
  const { cardBackgroundColor, cardBorderColor } = useCardColors();
  const { user } = useAuth();
  const [number, setNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showDifficultySelection, setShowDifficultySelection] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [logros, setLogros] = useState<Logro[]>([]);
  const [totalAttempts, setTotalAttempts] = useState(0); // Nuevo estado
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0); // Nuevo estado

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isGameActive) {
      setMessage(`¡Se acabó el tiempo! Respuestas correctas: ${correctAnswers}.`);
      manejarResultado();
      setIsGameActive(false);
    }

    return () => clearInterval(timer);
  }, [time, isGameActive]);

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

  const generateOperation = () => {
    const operations = ['+', '-', '*', '/'];
    const selectedOperation = operations[Math.floor(Math.random() * operations.length)];
    let num1 = Math.floor(Math.random() * 20);
    let num2 = Math.floor(Math.random() * 20);
  
    let newOperation: string;
    let newCorrectAnswer: number;
  
    switch (selectedOperation) {
      case '+':
        newOperation = `${num1} + ${num2}`;
        newCorrectAnswer = num1 + num2;
        break;
      case '-':
        // Ensure the result is non-negative
        if (num1 < num2) [num1, num2] = [num2, num1];
        newOperation = `${num1} - ${num2}`;
        newCorrectAnswer = num1 - num2;
        break;
      case '*':
        newOperation = `${num1} * ${num2}`;
        newCorrectAnswer = num1 * num2;
        break;
      case '/':
        // Ensure no division by zero and only integer results
        while (num2 === 0 || num1 % num2 !== 0) {
          num2 = Math.floor(Math.random() * 20) + 1; // Ensure num2 is not zero
        }
        newOperation = `${num1} / ${num2}`;
        newCorrectAnswer = num1 / num2;
        break;
      default:
        newOperation = '';
        newCorrectAnswer = 0;
    }
  
    setOperation(newOperation);
    setCorrectAnswer(newCorrectAnswer);
    setNumber('');
  };

  const handleStartGame = (timeLimit: number) => {
    setTime(timeLimit);
    setShowDifficultySelection(false);
    setMessage('');
    setAttempts(0);
    setCorrectAnswers(0);
    setIsGameActive(true);
    generateOperation();
  };

  const checkAnswer = () => {
    const guessedNumber = parseFloat(number);
    setAttempts(attempts + 1);
    if (guessedNumber === correctAnswer) {
      setMessage('¡Correcto!');
      setCorrectAnswers(correctAnswers + 1);
      setTotalCorrectAnswers(totalCorrectAnswers + 1); // Actualizar total de respuestas correctas
      generateOperation();
    } else {
      setMessage('Incorrecto, intenta de nuevo.');
    }
    setTotalAttempts(totalAttempts + 1); // Actualizar total de intentos
    setNumber('');
  };

  const manejarResultado = () => {
    if (user) {
      const resultado = {
        correctas: correctAnswers,
        intentos: attempts,
        fecha: new Date().toISOString()
      };

      agregarHistorialJuego({
        id_users: user.uid,
        id_Game: idJuego,
        results: resultado,
      }).then(() => {
        const promesasLogros = logros.map((logro) => {
          return verificarLogroCompletoPorUsuarioYLogro(user.uid, logro.id_logro).then((logroCompletado) => {
            if (!logroCompletado) {
              let logroCumplido = false;
              switch (logro.description) {
                case '5 respuestas correctas':
                  logroCumplido = correctAnswers >= 5;
                  break;
                case '10 respuestas correctas':
                  logroCumplido = correctAnswers >= 10;
                  break;
                case '20 respuestas correctas':
                  logroCumplido = correctAnswers >= 20;
                  break;
                case '30 respuestas correctas':
                  logroCumplido = correctAnswers >= 30;
                  break;
              }

              if (logroCumplido) {
          
                return agregarLogro({
                  id_game: idJuego,
                  id_logro: logro.id_logro,
                  id_user: user.uid,
                }).then(() => {
                  return logro.description;
                }).catch(error => {
                  console.error('Error al desbloquear logro:', error);
                  return null;
                });
              } else {
                return null;
              }
            } else {
              return null;
            }
          });
        });

        Promise.all(promesasLogros).then((resultados) => {
          resultados.forEach((descripcion, index) => {
            if (descripcion) {
              setTimeout(() => {
                showToastMessage('success', '¡Logro desbloqueado!', descripcion);
              }, index * 1000);
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
    setTotalAttempts(0); 
    setTotalCorrectAnswers(0);
    setShowDifficultySelection(true);
  };



  return (
    <ThemedView>
      {showDifficultySelection ? (
        <AciertaD onStartGame={handleStartGame} />
      ) : (
        <ThemedView style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ThemedText>{`Total de intentos: ${totalAttempts}`}</ThemedText>
          <ThemedText>{`Total de respuestas correctas:  ${totalCorrectAnswers}`}</ThemedText>
          <ThemedText type='title'>Tiempo restante en segundos:</ThemedText>
          <ThemedText>{time}</ThemedText>

          <ThemedText>{operation}</ThemedText>
          <ThemedTextInput
            onChangeText={setNumber}
            value={number}
            placeholder="Respuesta"
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={checkAnswer}
          />
          <ThemedView style={styles.buttonContainer}>
            <Button
              title="Comprobar"
              onPress={checkAnswer}
              color="blue"
              disabled={time === 0}
            />
          </ThemedView>
          {time === 0 && (
            <ThemedView style={styles.buttonContainer}>
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 20,
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 25,
  },
});

export default AciertaJ;
