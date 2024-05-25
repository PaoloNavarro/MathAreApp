import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { showToastMessage } from '@/components/showToastMessage';
import Toast from 'react-native-toast-message';
import useCardColors from '@/constants/CardColors';

interface AdivinaDProps {
  onStartGame: (maxRange: number, timeLimit: number) => void;
}

const AdivinaD: React.FC<AdivinaDProps> = ({ onStartGame }) => {
  const [maxRange, setMaxRange] = useState<string>('100');
  const [timeLimit, setTimeLimit] = useState<string>('60');
  const { cardBackgroundColor, cardBorderColor } = useCardColors();

  const handleStartGame = () => {
    if (maxRange.trim() === '' && timeLimit.trim() === '') {
      showToastMessage('error', 'Error', 'Por favor, complete ambos campos.');
    } else if (maxRange.trim() === '') {
      showToastMessage('error', 'Error', 'Por favor, complete el campo de rango máximo.');
    } else if (timeLimit.trim() === '') {
      showToastMessage('error', 'Error', 'Por favor, complete el campo de límite de tiempo.');
    } else {
      onStartGame(parseInt(maxRange), parseInt(timeLimit));
    }
  };

  const handleMaxRangeChange = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setMaxRange(cleanText);
  };

  const handleTimeLimitChange = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setTimeLimit(cleanText);
  };


  return (
    <ThemedView style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
      <ThemedText type='title'>Selecciona la dificultad</ThemedText>
      <ThemedView style={styles.inputContainer}>
        <ThemedText>Rango máximo:</ThemedText>
        <ThemedTextInput
          value={maxRange}
          onChangeText={handleMaxRangeChange}
          keyboardType="numeric"
          returnKeyType="done"

        />
      </ThemedView>
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
    elevation: 4, // for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 20,
    borderWidth: 1, // Add border width for the card
  },
  inputContainer: {
    marginBottom: 15,
  }
});

export default AdivinaD;
