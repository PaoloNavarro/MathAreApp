import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Link } from 'expo-router';
import { Collapsible } from '@/components/Collapsible';

interface MenuGamesProps {
  title: string;
  playComponent: React.ReactNode;
  historialComponent: React.ReactNode;
  achievementsComponent: React.ReactNode;
  indicaciones: string;
}

const MenuGames: React.FC<MenuGamesProps> = ({ title, playComponent, historialComponent, achievementsComponent, indicaciones }) => {
  const [activeMenu, setActiveMenu] = useState<'play' | 'historial' | 'achievements'>('play');

  const renderActiveComponent = () => {
    switch (activeMenu) {
      case 'play':
        return (
          <>
            <Collapsible title="Instrucciones">
              <ThemedText type="default">{indicaciones}</ThemedText>
            </Collapsible>
            {playComponent}
          </>
        );
      case 'historial':
        return historialComponent;
      case 'achievements':
        return achievementsComponent;
      default:
        return null;
    }
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type='title' style={styles.title}>{title}</ThemedText>
        <Link href="/gamesScreen">
          <ThemedText type="link">Regresa al menu</ThemedText>
        </Link>
        <View style={styles.menu}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#5cb85c' }]}
            onPress={() => setActiveMenu('achievements')}
          >
            <Ionicons name="trophy" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#f0ad4e' }]}
            onPress={() => setActiveMenu('play')}
          >
            <Ionicons name="play" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#d9534f' }]}
            onPress={() => setActiveMenu('historial')}
          >
            <Ionicons name="time" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {renderActiveComponent()}
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

export default MenuGames;
