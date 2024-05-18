import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculadora',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Herramientas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
      name="prueba"
      options={{
        title: 'Juegos',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'game-controller' : 'game-controller-outline'} color={color} />
        ),
      }}
      />
      <Tabs.Screen
      name="aboutScreen"
      options={{
        title: 'Sobre Nostros ',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'information-circle' : 'information-circle-outline'} color={color} />
        ),
      }}
      />
    </Tabs>
  );
}
