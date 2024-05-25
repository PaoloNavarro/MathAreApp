import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { getUsersByEmail } from '@/scripts/Firabase/userService';
import { useAuth } from '@/contexts/AuthContext';
import StaticView from '@/components/StaticView';
import Header from '@/components/users/Header';
import { StyleSheet, View, Text } from 'react-native';

export default function ProfileComponent() {
  const { user } = useAuth(); // Supongo que estás obteniendo el usuario de algún lugar, como un contexto de autenticación

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // Estado para almacenar la información del usuario

  useEffect(() => {
    // Obtener la información del usuario cuando el componente se monta
    if (user?.email) {
      // Llamar al método para obtener la información del usuario por su correo electrónico
      getUsersByEmail(user?.email)
        .then((userData) => {
          if (userData) {
            // Si se encuentra la información del usuario, actualizar el estado
            setUserInfo(userData);
          } else {
            console.error('No se encontró información para el usuario con el correo electrónico:', user.email);
          }
        })
        .catch((error) => {
          console.error('Error al obtener la información del usuario:', error);
        });
    }
  }, [user]); // Ejecutar solo cuando cambia el usuario

  return (
    <StaticView>
      <ThemedView>
      <Header />
      </ThemedView>
      <View style={styles.profileContainer}>
        <ThemedText type='title'>Mi perfil</ThemedText>
        {userInfo && (
          <ThemedView style={styles.profileInfo}>
            <ThemedText  type='subtitle'>Nombre: {userInfo.firstName}</ThemedText>
            <ThemedText  type='subtitle'>Apellido: {userInfo.lastName}</ThemedText>
            <ThemedText type='subtitle'>Email: {userInfo.email}</ThemedText>
            <ThemedText  type='subtitle'>Teléfono: {userInfo.phoneNumber}</ThemedText>
            <ThemedText  type='subtitle'>Edad: {userInfo.age}</ThemedText>
          </ThemedView>
        )}
      </View>
    </StaticView>
  );
}

// Estilos utilizando StyleSheet
const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20, // Ajusta el margen según sea necesario
  },
  profileInfo: {
    marginTop: 20, // Ajusta el margen según sea necesario
    textAlign: 'center',
  },
});
