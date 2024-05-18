import { Image, StyleSheet, Platform } from 'react-native';
import React from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const programmers = [
  {
    name: 'Christian Armando Diaz López',
    image: 'https://previews.123rf.com/images/jemastock/jemastock1705/jemastock170501678/77402317-color-l%C3%A1piz-vista-frontal-hombre-morena-sin-rostro-con-gafas-ilustraci%C3%B3n-vectorial.jpg',
  },
  {
    name: 'Juan José Gómez Acuña',
    image: 'https://static.vecteezy.com/system/resources/previews/002/002/332/non_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg',
  },
  {
    name: 'Diego Esaú Hernández Magaña',
    image:'https://c8.alamy.com/compes/2by6kcn/expresion-de-cara-de-joven-guapo-sonriendo-emocion-masculina-avatar-personaje-de-dibujos-animados-ilustracion-vectorial-aislada-sobre-fondo-blanco-2by6kcn.jpg',
  },
  {
    name: 'Paolo Isaac Navarro Rosales',
    image: 'https://i.pinimg.com/736x/58/93/53/5893538d2888dc4e6d82ecf0994b7d18.jpg',
  },
];

export default function AboutScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Sobre Nostros</ThemedText>
        {programmers.map((programmer, index) => (
          <ThemedView key={index} style={styles.programmerContainer}>
            <Image source={{ uri: programmer.image }}  style={styles.programmerImage} />
            <ThemedText type="subtitle">{programmer.name}</ThemedText>
          </ThemedView>
        ))}
        <HelloWave />
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
    marginBottom: 16,
    gap: 8,
  },
  programmerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
