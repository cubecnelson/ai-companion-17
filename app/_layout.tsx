import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SplashScreen } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout() {
  const { user, loading } = useAuth();
  useFrameworkReady();

  const router = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }} onLayout={() => {
      router.replace('/auth');
        }}>
        <Stack options={{ headerShown: false }}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
          <Stack.Screen name="create-model" options={{
            headerTintColor: 'black',
            headerBackVisible: true,
            headerBackTitle: "Back",
            headerTitle: "",
            headerBackTitleVisible: true,
          }}/>
          <Stack.Screen name="chat/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="subscription" options={{
            headerTintColor: 'black',
            headerBackVisible: true,
            headerBackTitle: "Back",
            headerTitle: "",
            headerBackTitleVisible: true,
          }} />
          <Stack.Screen name="profile" options={{
            headerTintColor: 'black',
            headerBackVisible: true,
            headerBackTitle: "Back",
            headerTitle: "",
            headerBackTitleVisible: true,
          }} />
        </Stack>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}