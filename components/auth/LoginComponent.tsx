import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { login } from '@/scripts/Firabase/authService';  // Adjust the path according to your structure
import { Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';  // Adjust the path according to your structure
import { ThemedView } from '@/components/ThemedView';  // Adjust the path according to your structure
import ButtonP from '@/components/ButtonP'; // Adjust the path according to your structure
import { showToastMessage } from '@/components/showToastMessage';
import Toast from 'react-native-toast-message';
import StaticView from '@/components/StaticView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { cardStyles } from '@/styles/cardStyles';
import LogoComponent from '@/components/LogoComponent'

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/gamesScreen');
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
      router.replace('/gamesScreen');
    } catch (error) {
      console.error(error);
      showToastMessage('error', 'Error', 'Correo electrónico o contraseña incorrectos.');
    }
  };

  return (
    <StaticView>
      <ThemedView style={styles.headerContainer}>
      <LogoComponent /> 
      </ThemedView>
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
  staticView: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center', // Center horizontally
    marginBottom: 16, // Space between the image and the rest of the content
  },
  headerImage: {
    width: 150, // Set the desired width
    height: 96, // Maintain aspect ratio (862 / 555 = 1.55, so 150 / 1.55 = 96)
  },
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

export default LoginComponent;
