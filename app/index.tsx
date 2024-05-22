import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { login } from '../scripts/Firabase/authService';  // Ajusta la ruta según tu estructura
import { Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';  // Ajusta la ruta según tu estructura
import { ThemedView } from '@/components/ThemedView';  // Ajusta la ruta según tu estructura
import ButtonP from '@/components/ButtonP'; // Ajusta la ruta según tu estructura
import { showToastMessage } from '@/components/showToastMessage';
import Toast from 'react-native-toast-message';
import StaticView from '@/components/StaticView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { cardStyles } from '@/styles/cardStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/indexT');
      }
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      showToastMessage('error', 'Error', 'Por favor, ingrese el correo electrónico y la contraseña.');
      return;
    }

    try {
      await login(email, password);
      router.replace('/indexT');
    } catch (error) {
      console.error(error);
      showToastMessage('error', 'Error', 'Correo electrónico o contraseña incorrectos.');
    }
  };

  return (
    <StaticView>
      <ThemedView style={cardStyles.card}>
      <ThemedText type="title">Inicio de sesión</ThemedText>
      <ThemedView style={styles.container}>
        <ThemedTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          returnKeyType="done"
        />
        <ThemedTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          returnKeyType="done"
        />
        <ButtonP
          title="Inicio de sesión"
          onPress={handleLogin}
          backgroundColor="#2196F3"
          
        />
        <Link href="/registerScreen">
          <ThemedText type="link">Registrate</ThemedText>
        </Link>
      </ThemedView>
      </ThemedView>
      
      <Toast />
    </StaticView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
