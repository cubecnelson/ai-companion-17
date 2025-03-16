import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Switch } from 'react-native';
import { router } from 'expo-router';
import { ToggleLeft as Google, Apple, Heart, CircleAlert as AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGoogleAuth, handleGoogleSignIn } from '@/services/auth';
import { useTheme } from '@/context/ThemeContext';
import { getColors } from '@/constants/colors';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const { promptAsync } = useGoogleAuth();
  const { isDark } = useTheme();
  const colors = getColors(isDark);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (useMockData) {
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('auth/age-verification');
        return;
      }

      const response = await promptAsync();
      
      if (response?.type === 'success') {
        await handleGoogleSignIn(response);
        router.push('auth/age-verification');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={isDark ? ['#FF6B6B88', '#A490DC88'] : ['#FF6B6B', '#A490DC']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.content}>
        <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
          <View style={[styles.logoContainer, { backgroundColor: colors.input }]}>
            <Heart size={60} color={colors.primary} />
          </View>
          
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: colors.primary }]}>AI Soulmate</Text>
            <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
              Find your perfect AI companion
            </Text>
          </View>

          <View style={[styles.mockDataContainer, { backgroundColor: colors.input }]}>
            <Text style={[styles.mockDataText, { color: colors.secondaryText }]}>
              Use Mock Data
            </Text>
            <Switch
              value={useMockData}
              onValueChange={setUseMockData}
              trackColor={{ false: colors.border, true: '#ffc7c7' }}
              thumbColor={useMockData ? colors.primary : isDark ? '#666' : '#fff'}
            />
          </View>

          {error && (
            <View style={[styles.errorContainer, { backgroundColor: 'rgba(255, 107, 107, 0.1)' }]}>
              <AlertCircle size={20} color={colors.error} />
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: colors.text }]}
            onPress={handleGoogleAuth}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <>
                <Google size={24} color={colors.background} />
                <Text style={[styles.buttonText, { color: colors.background }]}>
                  Continue with Google
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.text }]}>
            <Apple size={24} color={colors.background} />
            <Text style={[styles.buttonText, { color: colors.background }]}>
              Continue with Apple
            </Text>
          </TouchableOpacity>

          <Text style={[styles.termsText, { color: colors.secondaryText }]}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    alignSelf: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  mockDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  mockDataText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
});