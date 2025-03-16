import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Crown, Check, ChevronRight } from 'lucide-react-native';

const features = [
  {
    title: 'Unlimited AI Companions',
    description: 'Create and chat with as many AI companions as you want',
    included: true,
  },
  {
    title: 'Advanced Personality Customization',
    description: 'Fine-tune every aspect of your AI companions',
    included: true,
  },
  {
    title: 'Priority Response Time',
    description: 'Get faster responses from your AI companions',
    included: true,
  },
  {
    title: 'Custom Avatar Generation',
    description: 'Generate unique avatars for your companions',
    included: true,
  },
  {
    title: 'Conversation History',
    description: 'Access unlimited chat history',
    included: true,
  },
];

export default function Subscription() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Premium Features</Text>
        <Text style={styles.subtitle}>
          Unlock the full potential of your AI companions
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.premiumCard}>
          <View style={styles.crownContainer}>
            <Crown size={32} color="#FFD700" />
          </View>
          <Text style={styles.premiumTitle}>AI Soulmate Premium</Text>
          <Text style={styles.premiumDescription}>
            Get unlimited access to all features and create deeper connections with your AI companions
          </Text>
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => router.push('/tabs/subscription/plans')}
          >
            <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
              <View style={styles.featureCheck}>
                <Check size={20} color="#4CAF50" />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.testimonialSection}>
          <Text style={styles.sectionTitle}>What Users Say</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.testimonialScroll}
          >
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.testimonialCard}>
                <Image
                  source={{
                    uri: `https://images.unsplash.com/photo-${
                      index + 1
                    }?w=100&h=100&fit=crop`,
                  }}
                  style={styles.testimonialAvatar}
                />
                <Text style={styles.testimonialText}>
                  "The premium features have completely transformed how I interact
                  with my AI companions. It's worth every penny!"
                </Text>
                <Text style={styles.testimonialName}>Sarah Johnson</Text>
                <Text style={styles.testimonialDate}>Premium Member</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.push('/tabs/subscription/plans')}
        >
          <Text style={styles.footerButtonText}>View Premium Plans</Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FF6B6B',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  premiumCard: {
    backgroundColor: '#000',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 32,
  },
  crownContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  premiumDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  upgradeButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  upgradeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  featureCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  testimonialSection: {
    marginBottom: 32,
  },
  testimonialScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  testimonialCard: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  testimonialAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 16,
  },
  testimonialText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#000',
    lineHeight: 22,
    marginBottom: 16,
  },
  testimonialName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#000',
  },
  testimonialDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  footerButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});