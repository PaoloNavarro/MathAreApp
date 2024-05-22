import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function UtilsScreen() {
  return (
    <ThemedView style={styles.container}>
    <ThemedText type='title'>Menu de utilidades</ThemedText>
      <Link href="utils/conversor" style={[styles.button, styles.lightRedButton]}>
        <Ionicons name="play" size={24} color="white" />
        <ThemedText style={styles.buttonText}>Conversor de Unidades</ThemedText>
      </Link>

      <Link href="utils/areas" style={[styles.button, styles.lightBlueButton]}>
        <Ionicons name="play" size={24} color="white" />
        <ThemedText style={styles.buttonText}>Calculadora de areas</ThemedText>
      </Link>

      <Link href="utils/trigonometry" style={[styles.button, styles.lightGreenButton]}>
        <Ionicons name="play" size={24} color="white" />
        <ThemedText style={styles.buttonText}>Calculadora de razones trigonometricas</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
  },
  buttonText: {
    marginLeft: 8,
  },
  lightRedButton: {
    backgroundColor: '#FF6F61', // Light Red
  },
  lightBlueButton: {
    backgroundColor: '#6EB5FF', // Light Blue
  },
  lightGreenButton: {
    backgroundColor: '#A7DBD8', // Light Green
  },
});
