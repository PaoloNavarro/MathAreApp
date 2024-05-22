import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { showToastMessage } from '@/components/showToastMessage';
import Toast from 'react-native-toast-message';
import { useColorScheme } from 'react-native';

interface AciertaDProps {
  onStartGame: (timeLimit: number) => void;
}

const AciertaD: React.FC<AciertaDProps> = ({ onStartGame }) => {
  const [timeLimit, setTimeLimit] = useState<string>('60');
  const colorScheme = useColorScheme();

  const handleStartGame = () => {
    if (timeLimit.trim() === '') {
      showToastMessage('error', 'Error', 'Por favor, complete el campo de límite de tiempo.');
    } else {
      onStartGame(parseInt(timeLimit));
    }
  };

  const handleTimeLimitChange = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setTimeLimit(cleanText);
  };

  const cardBackgroundColor = colorScheme === 'dark' ? 'black' : 'white';
  const cardBorderColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <ThemedView style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
      <ThemedText type='title'>Selecciona la dificultad</ThemedText>
      <ThemedView style={styles.inputContainer}>
        <ThemedText>Tiempo límite (segundos):</ThemedText>
        <ThemedTextInput
          value={timeLimit}
          onChangeText={handleTimeLimitChange}
          keyboardType="numeric"
          returnKeyType="done"
        />
      </ThemedView>
      <ThemedView>
        <Button
          title="Comenzar"
          onPress={handleStartGame}
          color="blue"
        />
      </ThemedView>
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
  inputContainer: {
    marginBottom: 15,
  }
});

export default AciertaD;
