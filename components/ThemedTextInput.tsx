import React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightTextColor?: string;
  darkTextColor?: string;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  type?: 'default' | 'rounded' | 'underlined';
};

export function ThemedTextInput({
  style,
  lightTextColor,
  darkTextColor,
  lightBackgroundColor,
  darkBackgroundColor,
  type = 'default',
  ...rest
}: ThemedTextInputProps) {
  const textColor = useThemeColor({ light: lightTextColor, dark: darkTextColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, 'background');

  return (
    <TextInput
      style={[
        { color: textColor, backgroundColor },
        type === 'default' ? styles.default : undefined,
        type === 'rounded' ? styles.rounded : undefined,
        type === 'underlined' ? styles.underlined : undefined,
        style,
      ]}
      placeholderTextColor={textColor}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  rounded: {
    fontSize: 16,
    lineHeight: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
  },
  underlined: {
    fontSize: 16,
    lineHeight: 24,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});
