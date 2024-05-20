// RegisterScreen.tsx
import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { register } from '../scripts/Firabase/authService';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ButtonP from '@/components/ButtonP';
import { showToastMessage } from '@/components/showToastMessage';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import StaticView from '@/components/StaticView';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !gender || !phoneNumber || !age) {
      showToastMessage('error', 'Error', 'Por favor, complete todos los campos.');
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
    <ThemedView>
      <ThemedText type="title">Registro de usuario</ThemedText>
      <ThemedView style={styles.container}>
        <ThemedTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <ThemedTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <ThemedTextInput
          placeholder="Género"
          value={gender}
          onChangeText={setGender}
        />
        <ThemedTextInput
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <ThemedTextInput
          placeholder="Edad"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <ButtonP
          title="Registrar Usuario"
          onPress={handleRegister}
          backgroundColor="#2196F3"
        />
      </ThemedView>
    </ThemedView>
    </StaticView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  }
});

export default RegisterScreen;
