import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { programmers } from '@/constants/programmers';
import LogoComponent from '@/components/LogoComponent'


export default function AboutComponent() {
  return (
    <ParallaxScrollView>
      <HelloWave />

      <ThemedView style={styles.container}>
        <ThemedView  style={styles.title}>
          <ThemedText type="title">Sobre Nosotros</ThemedText>
        </ThemedView>
        {programmers.map((programmer, index) => (
          <ThemedView key={index} style={styles.programmerContainer}>
            <Image source={{ uri: programmer.image }} style={styles.programmerImage} />
            <ThemedText type="subtitle">{programmer.name}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
      <ThemedView style={styles.footerContainer}>
        <LogoComponent /> 

      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  programmerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    marginBottom: 16,
    gap: 8,
  },
  programmerImage: {
    width: 40, // Make the image smaller
    height: 40, // Make the image smaller
    borderRadius: 20, // Adjust the radius to match the new size
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align to the bottom
    alignItems: 'center', // Center horizontally
    paddingBottom: 16, // Add some padding at the bottom if needed
  },
  footerImage: {
    width: 150, // Set the desired width
    height: 96, // Maintain aspect ratio (862 / 555 = 1.55, so 150 / 1.55 = 96)
  },
  title:{
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  }
});
