import React, { useEffect, useState } from 'react';
import { StyleSheet,SafeAreaView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/scripts/Firabase/authService';
import { useRouter } from 'expo-router';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import ButtonP from '@/components/ButtonP'; // Ajusta la ruta según tu estructura
import { getUsersByEmail } from '@/scripts/Firabase/userService';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();

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
        <ThemedView>
            <ThemedText type='subtitle'> {userInfo?.firstName}</ThemedText> 
        </ThemedView>
        <ThemedView>
        <ButtonP
          title="Cerras sesion"
          onPress={handleLogout}
          backgroundColor="#2196F3"
        />
        </ThemedView>

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