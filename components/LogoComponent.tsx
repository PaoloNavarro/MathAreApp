import React from 'react';
import { Image, StyleSheet, useColorScheme } from 'react-native';

const LogoComponent: React.FC = () => {
  const colorScheme = useColorScheme();

  // Determina qué imagen cargar según el tema
  const logoImageSource = colorScheme === 'light' ? require('@/assets/images/codebustionsL.png') : require('@/assets/images/codebustions.png');

  return (
    <Image source={logoImageSource} style={styles.logoImage} />
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 150, // Ajusta el ancho según tus necesidades
    height: 96, // Ajusta el alto según tus necesidades
  },
});

export default LogoComponent;
