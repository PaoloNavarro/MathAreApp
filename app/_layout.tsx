import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';  // Ajusta la ruta según tu estructura
import { useRouter } from 'expo-router';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/index');
    }
  }, [loading, user]);

  if (loading) {
    return null;  // O un componente de carga
  }

  return user ? <>{children}</> : null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* Rutas sin proteger */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="registerScreen" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{
                headerShown: false,
              }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="games/adivina" options={{
                title: 'My home',
                headerShown: false,
              
              }} />

          {/* Rutas protegidas }
          <ProtectedRoute>
          
            {/* Añade más rutas protegidas aquí }
            </ProtectedRoute>*/}
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
