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
        name="calculadoraScreen"
        options={{
          title: 'Calculadora',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calculator' : 'calculator-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="utilsScreen"
        options={{
          title: 'Herramientas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
      name="gamesScreen"
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
        title: 'Sobre Nosotros ',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'information-circle' : 'information-circle-outline'} color={color} />
        ),
      }}
      />
      <Tabs.Screen
      name="profileScreen"
      options={{
        title: 'Mi perfil ',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
        ),
      }}
      />
    </Tabs>
  );
}
