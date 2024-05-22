// RegisterScreen.tsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { register } from '../scripts/Firabase/authService';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ButtonP from '@/components/ButtonP';
import { showToastMessage } from '@/components/showToastMessage';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import StaticView from '@/components/StaticView';
import { cardStyles } from '@/styles/cardStyles';
import Toast from 'react-native-toast-message';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const validateAge = (age: string) => {
    const ageNumber = parseInt(age, 10);
    return !isNaN(ageNumber) && ageNumber > 0 && ageNumber < 120;
  };

  const handleRegister = async () => {
    if (!email) {
      showToastMessage('error', 'Error', 'El campo de correo electrónico está vacío.');
      return;
    }
    if (!validateEmail(email)) {
      showToastMessage('error', 'Error', 'El formato del correo electrónico no es válido.');
      return;
    }
    if (!password) {
      showToastMessage('error', 'Error', 'El campo de la contraseña está vacío.');
      return;
    }
    if (password.length < 6) {
      showToastMessage('error', 'Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (!gender) {
      showToastMessage('error', 'Error', 'El campo de género está vacío.');
      return;
    }
    if (!phoneNumber) {
      showToastMessage('error', 'Error', 'El campo de número de teléfono está vacío.');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      showToastMessage('error', 'Error', 'El número de teléfono debe tener 10 dígitos.');
      return;
    }
    if (!age) {
      showToastMessage('error', 'Error', 'El campo de edad está vacío.');
      return;
    }
    if (!validateAge(age)) {
      showToastMessage('error', 'Error', 'La edad debe ser un número entre 1 y 120.');
      return;
    }

    try {
      await register(email, password, gender, phoneNumber, age);
      router.replace('/');
    } catch (error) {
      console.error(error);
      showToastMessage('error', 'Error', 'Verifique los datos del usuario.');
    }
  };

  return (
    <StaticView>
      <ThemedView style={cardStyles.card}>
        <ThemedText type="title">Registro de usuario</ThemedText>
        <ThemedView style={styles.container}>
          <ThemedTextInput
            placeholder="Correo electroncio"
            value={email}
            onChangeText={setEmail}
            style={styles.inputs}
            returnKeyType="done"
          />
          <ThemedTextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputs}
            returnKeyType="done"

          />
          <ThemedTextInput
            placeholder="Género"
            value={gender}
            onChangeText={setGender}
            style={styles.inputs}
            returnKeyType="done"

          />
          <ThemedTextInput
            placeholder="Número de teléfono"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
            style={styles.inputs}
            returnKeyType="done"

          />
          <ThemedTextInput
            placeholder="Edad"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            style={styles.inputs}
            returnKeyType="done"

          />
          <ButtonP
            title="Registrar Usuario"
            onPress={handleRegister}
            backgroundColor="#2196F3"
          />
          <Link href="/">
            <ThemedText type="link">Inicia sesión</ThemedText>
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
  inputs: {
    marginBottom: 10,
  },
});

export default RegisterScreen;
