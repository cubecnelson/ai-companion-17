import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { getColors } from '@/constants/colors';

interface ProfileHeaderProps {
  title: string;
  showTitle?: boolean;
}

export default function ProfileHeader({ title, showTitle = true }: ProfileHeaderProps) {
  const { isDark } = useTheme();
  const colors = getColors(isDark);

  return (
    <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      {showTitle && <Text style={[styles.title, { color: colors.primary }]}>{title}</Text>}
      <View style={styles.spacer} />
      <TouchableOpacity
        style={[styles.profileButton, { backgroundColor: colors.input }]}
        onPress={() => router.push('/profile')}
      >
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
  },
  spacer: {
    flex: 1,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});