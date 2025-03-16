import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { getColors } from '@/constants/colors';

export default function AuthLayout() {
  const { isDark } = useTheme();
  const colors = getColors(isDark);

  return (
    <Stack 
      initialRouteName="sign-in" 
      screenOptions={{ 
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background
        }
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="age-verification" />
    </Stack>
  );
}