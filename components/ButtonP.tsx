import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { ThemedText } from './ThemedText';

interface ButtonPProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
}

const ButtonP: React.FC<ButtonPProps> = ({ title, onPress, backgroundColor = '#2196F3' }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <ThemedText>{title}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ButtonP;
