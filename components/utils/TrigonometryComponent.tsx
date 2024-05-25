import React, { useState, useEffect } from 'react';
import { getTrigonometryFromFirestore } from '@/scripts/Firabase/utilsService';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { StyleSheet,ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import ButtonP from '@/components/ButtonP';
import { cardStyles } from '@/styles/cardStyles';
import useCardColors from '@/constants/CardColors';
import usePickColor from '@/constants/PickerColors';
import { Link } from 'expo-router';

const TrigonometryComponent: React.FC = () => {
  const [trigonometryData, setTrigonometryData] = useState<TrigonometryData | null>(null);
  const [selectedFunction, setSelectedFunction] = useState<string>('seno');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const { cardBackgroundColor, cardBorderColor } = useCardColors();
  const { pickerItemColor,pickerBackgroundColor} = usePickColor();

  useEffect(() => {
    const fetchTrigonometryData = async () => {
      try {
        const data = await getTrigonometryFromFirestore();
        setTrigonometryData(data);
      } catch (error) {
        console.error('Error fetching trigonometry data:', error);
      }
    };

    fetchTrigonometryData();
  }, []);

  const handleCalculate = () => {
    if (!selectedFunction || !trigonometryData || !trigonometryData.formulas[selectedFunction]) return;

    const { formula } = trigonometryData.formulas[selectedFunction];
    const angle = parseFloat(inputValue);
    const formulaWithValues = formula.replace('angulo', angle.toString());

    try {
      const calculatedValue = eval(formulaWithValues); // ¡Ten cuidado con eval!
      setResult(`El resultado de ${selectedFunction}(${angle}) es: ${calculatedValue}`);
    } catch (error) {
      console.error('Error evaluating formula:', error);
      setResult('Error al calcular la función trigonométrica');
    }
  };


 

  if (!trigonometryData) {
    return (
      <ThemedView style={[styles.loding, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
      <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />

  </ThemedView>
    );
  }
  return (
    <ParallaxScrollView>
         <Link href="/utilsScreen">
          <ThemedText type="link">Regresa al menu</ThemedText>
        </Link>
      <ThemedView>
        <ThemedView style={[cardStyles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ThemedText type='subtitle'>Seleccione una función trigonométrica:</ThemedText>
          <Picker
            selectedValue={selectedFunction}
            onValueChange={(value) => setSelectedFunction(value)}
            style={{ backgroundColor: pickerBackgroundColor }}
            mode="dropdown"
          >
            {trigonometryData.options.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
                color={pickerItemColor}
              />
            ))}
          </Picker>
        </ThemedView>

        <ThemedView style={[cardStyles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ThemedText type='subtitle'>Ángulo:</ThemedText>
          <ThemedTextInput
            placeholder="Ingrese el ángulo en radianes"
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="numeric"
            returnKeyType="done"
          />
        </ThemedView>

        <ThemedView style={[cardStyles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ThemedText type='title'>Resultado</ThemedText>
          <ThemedText type='subtitle'>{result}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.container}>
          <ButtonP
            title="Calcular"
            onPress={handleCalculate}
            backgroundColor="#2196F3"
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,

  },
   loding:{
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
});

export default TrigonometryComponent;
