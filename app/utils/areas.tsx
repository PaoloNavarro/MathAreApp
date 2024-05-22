import React, { useState, useEffect } from 'react';
import { getAreaFromFirestore } from '@/scripts/Firabase/utilsService'; // Asegúrate de que la ruta al archivo sea correcta
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { StyleSheet,ActivityIndicator  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from 'react-native';
import { cardStyles } from '@/styles/cardStyles';
import ButtonP from '@/components/ButtonP';


const AreaComponent: React.FC = () => {
  const [areas, setAreas] = useState<Areas | null>(null);
  const [selectedShape, setSelectedShape] = useState<string>('cuadrado'); // Establecer un valor predeterminado
  const [inputValues, setInputValues] = useState<{ [parameter: string]: string }>({});
  const [result, setResult] = useState<string>('');
  const colorScheme = useColorScheme();
  //colores de temas
  const cardBackgroundColor = colorScheme === 'dark' ? '#333' : 'white';
  const cardBorderColor = colorScheme === 'dark' ? 'white' : 'black';
  const pickerItemColor = colorScheme === 'dark' ? 'white' : 'black';
  const pickerBackgroundColor = colorScheme === 'dark' ? '#333' : '#fff';
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasData = await getAreaFromFirestore();
        setAreas(areasData);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  const handleCalculateArea = () => {
    if (!selectedShape || !areas || !areas.formulas[selectedShape]) return;

    const { parameters, formula } = areas.formulas[selectedShape];
    const parameterValues: { [key: string]: number } = {};

    parameters.forEach((param) => {
      parameterValues[param] = parseFloat(inputValues[param]);
    });

    let formulaWithValues = formula;

    // Replace variables in the formula with actual values
    for (const [key, value] of Object.entries(parameterValues)) {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      formulaWithValues = formulaWithValues.replace(regex, value.toString());
    }

    try {
      // Using Function constructor as a safer alternative to eval
      const calculatedArea = new Function(`return ${formulaWithValues}`)();
      setResult(`El área del ${selectedShape} es: ${calculatedArea}`);
    } catch (error) {
      console.error('Error evaluating formula:', error);
      setResult('Error al calcular el área');
    }
  };



  if (!areas) {
    return (
      <ThemedView style={[styles.loding, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />

      </ThemedView>

    );
  }

  return (
    <ParallaxScrollView>
      <ThemedView >
        <ThemedView style={[cardStyles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ThemedText type='subtitle'>Seleccione una forma:</ThemedText>
          <Picker
            selectedValue={selectedShape}
            onValueChange={(value) => setSelectedShape(value)}
            style={{ backgroundColor: pickerBackgroundColor }} // Set color for selected item text
            mode="dropdown"
          >
            {areas && areas.options.map((option, index) => (
              <Picker.Item style={{ backgroundColor: pickerBackgroundColor }} color={pickerItemColor} key={index} label={option.label} value={option.value} />
            )).filter(Boolean)}
          </Picker>
        </ThemedView>

        {selectedShape && areas && areas.formulas[selectedShape] && (
          areas.formulas[selectedShape].parameters.map((parameter, index) => (
            <ThemedView key={index} style={[cardStyles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
              <ThemedText type='subtitle'>Ingrese el valor de {parameter}:</ThemedText>
              <ThemedTextInput
                value={inputValues[parameter] || ''}
                onChangeText={(text) => setInputValues(prevState => ({ ...prevState, [parameter]: text }))}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </ThemedView>
          ))
        )}

        <ThemedView style={[cardStyles.card, { backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }]}>
          <ThemedText type='title'>Resultado</ThemedText>
          <ThemedText type='subtitle'>{result}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.container}>
          <ButtonP
            title="Calcular Área"
            onPress={handleCalculateArea}
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

export default AreaComponent;
