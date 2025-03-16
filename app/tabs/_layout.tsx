import { Tabs } from 'expo-router';
import { Chrome as Home, MessageSquare, Settings, Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { getColors } from '@/constants/colors';

export default function TabLayout() {
  const { isDark } = useTheme();
  const colors = getColors(isDark);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: 80,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.secondaryText,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Soulmates',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Messages',
            tabBarIcon: ({ color, size }) => (
              <MessageSquare size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}