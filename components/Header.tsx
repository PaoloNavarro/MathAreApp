import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/scripts/Firabase/authService';
import { useRouter } from 'expo-router';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import ButtonP from '@/components/ButtonP'; // Ajusta la ruta según tu estructura

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <SafeAreaView>
      <ThemedView style={styles.container}>
          <ThemedText type='subtitle'> {user?.email}</ThemedText>
          <ButtonP
          title="Cerras sesion"
          onPress={handleLogout}
          backgroundColor="#2196F3"
        />
        </ThemedView>
    </SafeAreaView>
    );
 
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  
  
 
});
export default Header;