import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AdivinaJ from '@/components/games/adivinaN/AdivinaJ';
import AdivinaL from '@/components/games/adivinaN/AdivinaL';
import AdivinaH from '@/components/games/adivinaN/AdivinaH';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const AdivinaScreen: React.FC = () => {
  const [menuPrincipal, setMenuPrincipal] = useState<'jugar' | 'logros' | 'historial'>('jugar');

  const renderMenu = () => {
    switch (menuPrincipal) {
      case 'jugar':
        return <AdivinaJ />;
      case 'logros':
        return <AdivinaL />;
      case 'historial':
        return <AdivinaH />;
      default:
        return null;
    }
  };

  return (
    <ParallaxScrollView>
    <ThemedView style={styles.container}>
      <ThemedText type='title' style={styles.title}>Adivina el número!!!</ThemedText>
      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#5cb85c' }]}
          onPress={() => setMenuPrincipal('logros')}
        >
          <Ionicons name="trophy" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#f0ad4e' }]}
          onPress={() => setMenuPrincipal('jugar')}
        >
          <Ionicons name="play" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#d9534f' }]}
          onPress={() => setMenuPrincipal('historial')}
        >
          <Ionicons name="time" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {renderMenu()}
    </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default AdivinaScreen;
