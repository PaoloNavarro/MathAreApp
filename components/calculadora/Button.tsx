import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, TextStyle, ViewStyle, Platform, useColorScheme } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  text: string;
  size?: 'double' | 'single';
  theme?: 'secondary' | 'accent' | 'default';
}

const CustomButton: React.FC<ButtonProps> = ({ onPress, text, size = 'single', theme = 'default' }) => {
  const buttonStyles: ViewStyle[] = [styles.button];
  const textStyles: TextStyle[] = [styles.text];
  const colorScheme = useColorScheme();

 

  // Ajustar colores según el esquema de color
  if (colorScheme === 'dark') {
    if (theme === 'secondary') {
      buttonStyles.push(styles.buttonSecondaryDark);
    } else if (theme === 'accent') {
      buttonStyles.push(styles.buttonAccentDark);
    } else if (size === 'double') {
      buttonStyles.push(styles.buttonDoubleDark);
    }
  }else {
    if (size === 'double') {
      buttonStyles.push(styles.buttonDouble);
    }
  
    if (theme === 'secondary') {
      buttonStyles.push(styles.buttonSecondary);
      textStyles.push(styles.textSecondary);
    } else if (theme === 'accent') {
      buttonStyles.push(styles.buttonAccent);
      textStyles.push(styles.textAccent);
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const screen = Dimensions.get("window");
let buttonWidth;

// Determinar el ancho del botón basado en el tipo de dispositivo y orientación
if (Platform.OS === "web" || screen.width > 768) {
  // Si es una pantalla grande (PC o tablet en modo horizontal)
  buttonWidth = screen.width / 12
} else if (screen.width > 400) {
  // Para tabletas en modo vertical en Android
  buttonWidth = screen.width / 6;
} else {
  // Para celulares y tabletas en modo vertical que no sean Android
  buttonWidth = screen.width / 4;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Math.floor(buttonWidth),
    margin: 5,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  textSecondary: {
    color: '#060606',
  },
  textAccent: {
    color: '#333333', // Puedes cambiar esto al color deseado para el texto del botón de acento
  },
  buttonDouble: {
    width: screen.width / 2 - 10,
    flex: 0,
    alignItems: 'flex-start',
    paddingLeft: 40,
  },
  buttonSecondary: {
    backgroundColor: '#a6a6a6',
  },
  buttonAccent: {
    backgroundColor: '#ffc107',
  },
  // Estilos para el esquema de color dark
  buttonSecondaryDark: {
    backgroundColor: '#a6a6a6',
  },
  buttonAccentDark: {
    backgroundColor: '#ffc107',
  },
  buttonDoubleDark: {
    backgroundColor: '#333333',
  },
});

export default CustomButton;
