import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export interface SubMenuProps {
  title: string;
  items: { href: string; text: string; color: string; iconName: string }[];
}

const SubMenuComponent: React.FC<SubMenuProps> = ({ title, items }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type='title'>{title}</ThemedText>
      {items.map((item, index) => (
        <Link key={index} href={item.href} style={[styles.button, { backgroundColor: item.color }]}>
          <Ionicons name={item.iconName as any} size={24} color="white" />
          <ThemedText style={styles.buttonText}>{item.text}</ThemedText>
        </Link>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
  },
  buttonText: {
    marginLeft: 8,
  },
});

export default SubMenuComponent;
