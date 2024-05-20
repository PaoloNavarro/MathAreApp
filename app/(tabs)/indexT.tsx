import {  StyleSheet,SafeAreaView,useColorScheme   } from 'react-native';
import React, { useState } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  Button  from '@/components/calculadora/Button';
import Row from '@/components/calculadora/Row';
import { calculator,initialState } from '@/scripts/calculadora/calculator';
import StaticView from '@/components/StaticView';


export default function calculadoraScreen() {
  const [state, setState] = useState(initialState);
  const colorScheme = useColorScheme();

  const handleTap = (type: string, value: string | number) => {
    setState((prevState) => calculator(type, String(value), prevState));
  };
  const resultTextColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
       

          <ThemedText style={[styles.result, { color: resultTextColor }]}>{parseFloat(state.currentValue).toLocaleString()}</ThemedText>

          <Row>
            <Button text="C" theme="secondary" onPress={() => handleTap('clear', '')} />
            <Button text="+/-" theme="secondary" onPress={() => handleTap('posneg', '')} />
            <Button text="%" theme="secondary" onPress={() => handleTap('percentage', '')} />
            <Button text="/" theme="accent" onPress={() => handleTap('operator', '/')} />
          </Row>

          <Row>
            <Button text="7" onPress={() => handleTap('number', 7)} />
            <Button text="8" onPress={() => handleTap('number', 8)} />
            <Button text="9" onPress={() => handleTap('number', 9)} />
            <Button text="X" theme="accent" onPress={() => handleTap('operator', '*')} />
          </Row>

          <Row>
            <Button text="4" onPress={() => handleTap('number', 4)} />
            <Button text="5" onPress={() => handleTap('number', 5)} />
            <Button text="6" onPress={() => handleTap('number', 6)} />
            <Button text="-" theme="accent" onPress={() => handleTap('operator', '-')} />
          </Row>

          <Row>
            <Button text="1" onPress={() => handleTap('number', 1)} />
            <Button text="2" onPress={() => handleTap('number', 2)} />
            <Button text="3" onPress={() => handleTap('number', 3)} />
            <Button text="+" theme="accent" onPress={() => handleTap('operator', '+')} />
          </Row>

          <Row>
            <Button text="0" onPress={() => handleTap('number', 0)} />
            <Button text="." onPress={() => handleTap('number', '.')} />
            <Button text="=" theme="accent" onPress={() => handleTap('equal', '=')} />
          </Row>

      </ThemedView>
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  container:{

  },
  result: {
    paddingTop: 20,
    marginTop: 40,
    fontSize: 42,
    textAlign: 'right',
    marginRight: 20,
  },
  value: {
    color: '#fff',
    fontSize: 42,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
});
