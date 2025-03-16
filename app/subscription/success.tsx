import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CircleCheck as CheckCircle, Chrome as Home } from 'lucide-react-native';

export default function Success() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={64} color="#4CAF50" />
        </View>
        <Text style={styles.title}>Welcome to Premium!</Text>
        <Text style={styles.message}>
          Your subscription has been successfully activated. Enjoy all the premium
          features of AI Soulmate!
        </Text>
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What's Next?</Text>
          <Text style={styles.featureItem}>
            • Create unlimited AI companions
          </Text>
          <Text style={styles.featureItem}>
            • Access advanced customization options
          </Text>
          <Text style={styles.featureItem}>
            • Enjoy priority support and updates
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/tabs')}
      >
        <Home size={20} color="#fff" />
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#4CAF50',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 16,
  },
  featuresTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000',
    marginBottom: 16,
  },
  featureItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});