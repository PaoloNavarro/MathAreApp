import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function gamesScreen() {
  return (
    <ThemedView style={styles.container}>
          <ThemedText type='title'>Menu de juegos</ThemedText>

      <Link href="games/adivina" style={[styles.button, styles.redButton]}>
        <Ionicons name="play" size={24} color="white" />
        <ThemedText style={styles.buttonText}>Adivina el juego</ThemedText>
      </Link>

      <Link href="games/acierta" style={[styles.button, styles.blueButton]}>
        <Ionicons name="play" size={24} color="white" />
        <ThemedText style={styles.buttonText}>Acierta numeros</ThemedText>
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
  redButton: {
    backgroundColor: '#FF6F61', // Light Red
  },
  blueButton: {
    backgroundColor: '#6EB5FF', // Light Blue
  },
  greenButton: {
    backgroundColor: '#A7DBD8', // Light Green
  },
});
