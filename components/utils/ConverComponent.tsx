import React, { useState, useEffect } from 'react';
import { getConversionsFromFirestore } from '@/scripts/Firabase/utilsService';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import ButtonP from '@/components/ButtonP'; 
import { cardStyles } from '@/styles/cardStyles';
import useCardColors from '@/constants/CardColors';
import usePickColor from '@/constants/PickerColors';
import { Link } from 'expo-router';

const ConverComponent: React.FC = () => {
  const [conversions, setConversions] = useState<{ [key: string]: ConversionsV } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('longitud'); // Establecer un valor predeterminado
  const [inputValue, setInputValue] = useState<string>(''); // Cambio a string para manejar mejor el input
  const [inputUnit, setInputUnit] = useState<string>('');
  const [outputUnit, setOutputUnit] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const { cardBackgroundColor, cardBorderColor } = useCardColors();
  const { pickerItemColor,pickerBackgroundColor} = usePickColor();


  useEffect(() => {
    const fetchConversions = async () => {
      try {
        const conversionsData = await getConversionsFromFirestore();
        setConversions(conversionsData);
      } catch (error) {
        console.error('Error fetching conversions:', error);
      }
    };

    fetchConversions();
  }, []);

  const handleConversion = () => {
    if (!inputValue || !inputUnit || !outputUnit || !selectedCategory || !conversions) return;

    const conversion = conversions[selectedCategory];
    const numericInputValue = parseFloat(inputValue);

    if (isNaN(numericInputValue) || !conversion || !conversion.conversiones[inputUnit] || !conversion.conversiones[inputUnit][outputUnit]) {
      setResult('Unidades o valores inválidos de conversión');
      return;
    }

    let convertedValue;
    if (selectedCategory === 'temperatura') {
      const { factor, offset } = conversion.conversiones[inputUnit][outputUnit] as { factor: number, offset: number };
      convertedValue = (numericInputValue * factor) + offset;
    } else {
      const conversionFactor = conversion.conversiones[inputUnit][outputUnit] as number;
      convertedValue = numericInputValue * conversionFactor;
    }

    setResult(`${inputValue} ${inputUnit} es igual a: ${convertedValue} ${outputUnit}`);
  };

  if (!conversions) {
    return (
      <ThemedView style={[styles.loading, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
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
          <ThemedText type='subtitle'>Seleccione una categoria:</ThemedText>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
            style={{ backgroundColor: pickerBackgroundColor }}
            mode="dropdown"
          >
            {conversions && Object.keys(conversions).map((category, index) => (
              <Picker.Item style={{ backgroundColor: pickerBackgroundColor }} color={pickerItemColor} key={index} label={category} value={category} />
            )).filter(Boolean)}
          </Picker>
        </ThemedView>

        <ThemedView style={[cardStyles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ThemedText type='subtitle'>Desde:</ThemedText>
          <Picker
            selectedValue={inputUnit}
            onValueChange={(value) => setInputUnit(value)}
            style={{ backgroundColor: pickerBackgroundColor }}
            mode="dropdown"
          >
            {selectedCategory && conversions && conversions[selectedCategory].options.map((option, index) => (
              <Picker.Item style={{ backgroundColor: pickerBackgroundColor }} color={pickerItemColor} key={index} label={option.label} value={option.value} />
            )).filter(Boolean)}
          </Picker>
        </ThemedView>

        <ThemedView style={[cardStyles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ThemedText type='subtitle'>Hasta:</ThemedText>
          <Picker
            selectedValue={outputUnit}
            onValueChange={(value) => setOutputUnit(value)}
            style={{ backgroundColor: pickerBackgroundColor }}
            mode="dropdown"
          >
            {selectedCategory && conversions && conversions[selectedCategory].options.map((option, index) => (
              <Picker.Item style={{ backgroundColor: pickerBackgroundColor }} color={pickerItemColor} key={index} label={option.label} value={option.value} />
            )).filter(Boolean)}
          </Picker>
        </ThemedView>

        <ThemedView style={[cardStyles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ThemedText type='title'>Resultado</ThemedText>
          <ThemedText type='subtitle'>{result}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.container}>
          <ThemedTextInput
            style={{ marginBottom: 15 }}
            placeholder="Ingrese el valor a convertir:"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={handleConversion}
          />

          <ButtonP
            title="Conversion"
            onPress={handleConversion}
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
  loading: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
});

export default ConverComponent;
