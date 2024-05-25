import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { register } from '@/scripts/Firabase/authService';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ButtonP from '@/components/ButtonP';
import { showToastMessage } from '@/components/showToastMessage';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import StaticView from '@/components/StaticView';
import { cardStyles } from '@/styles/cardStyles';
import Toast from 'react-native-toast-message';

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const re = /^\d{9}$/;
    return re.test(phoneNumber);
  };

  const validateAge = (age: string) => {
    const ageNumber = parseInt(age, 10);
    return !isNaN(ageNumber) && ageNumber > 0 && ageNumber < 120;
  };

  const handleRegister = async () => {
    // Convert email to lowercase
    const lowerCaseEmail = email.toLowerCase();

    // Validar que los campos obligatorios estén completos
    if (!lowerCaseEmail || !password || !phoneNumber || !age || !firstName || !lastName) {
      showToastMessage('error', 'Error', 'Por favor complete todos los campos.');
      return;
    }
    // Validar el formato de los campos
    if (!validateEmail(lowerCaseEmail)) {
      showToastMessage('error', 'Error', 'El formato del correo electrónico no es válido.');
      return;
    }
    if (password.length < 6) {
      showToastMessage('error', 'Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      showToastMessage('error', 'Error', 'El número de teléfono debe tener 9 dígitos.');
      return;
    }
    if (!validateAge(age)) {
      showToastMessage('error', 'Error', 'La edad debe ser un número entre 1 y 120.');
      return;
    }

    // Crear objeto UserInfo con los datos del usuario
    const userInfo: UserInfo = {
      email: lowerCaseEmail,
      phoneNumber,
      age: parseInt(age, 10), // Convertir edad a número
      firstName,
      lastName,
    };

    try {
      // Registrar usuario
      await register(userInfo, password);
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
            placeholder="Correo electrónico"
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
          <ThemedTextInput
            placeholder="Nombre"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.inputs}
            returnKeyType="done"
          />
          <ThemedTextInput
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName}
            style={styles.inputs}
            returnKeyType="done"
          />
          <ButtonP
            title="Registrar Usuario"
            onPress={handleRegister}
            backgroundColor="#2196F3"
          />
          <Link href="/">
            <ThemedText type="link">Iniciar sesión</ThemedText>
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

export default RegisterComponent;
