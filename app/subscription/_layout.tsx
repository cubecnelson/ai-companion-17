import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { getColors } from '@/constants/colors';

export default function SubscriptionLayout() {
  const { isDark } = useTheme();
  const colors = getColors(isDark);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colors.background
        }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="plans" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="success" />
    </Stack>
  );
}