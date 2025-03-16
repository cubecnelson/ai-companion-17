import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { getColors } from '@/constants/colors';

export default function CreateLayout() {
  const { isDark } = useTheme();
  const colors = getColors(isDark);

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.background
        },
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.background
        }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="personality" />
      <Stack.Screen name="language" />
      <Stack.Screen name="tone" />
      <Stack.Screen name="prompts" />
      <Stack.Screen name="avatar" />
      <Stack.Screen name="review" />
    </Stack>
  );
}