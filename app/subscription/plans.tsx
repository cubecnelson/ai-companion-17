import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Check, Crown, Zap, Star } from 'lucide-react-native';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$9.99',
    period: 'per month',
    popular: true,
    features: [
      'Unlimited AI companions',
      'Advanced customization',
      'Priority support',
      'No ads',
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$89.99',
    period: 'per year',
    savings: 'Save 25%',
    features: [
      'All Monthly features',
      'Premium avatars',
      'Early access to new features',
      'Exclusive community access',
    ],
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$299.99',
    period: 'one-time',
    features: [
      'All Yearly features',
      'Lifetime updates',
      'VIP support',
      'Custom AI training',
    ],
  },
];

export default function SubscriptionPlans() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>
          Select the plan that best fits your needs
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[styles.planCard, plan.popular && styles.popularPlan]}
            onPress={() => router.push('/tabs/subscription/payment')}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Crown size={16} color="#FFD700" />
                <Text style={styles.popularText}>Most Popular</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <View style={styles.planIcon}>
                {plan.id === 'monthly' ? (
                  <Zap size={24} color="#FF6B6B" />
                ) : plan.id === 'yearly' ? (
                  <Star size={24} color="#FF6B6B" />
                ) : (
                  <Crown size={24} color="#FF6B6B" />
                )}
              </View>
              <Text style={styles.planName}>{plan.name}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.planPrice}>{plan.price}</Text>
              <Text style={styles.planPeriod}>{plan.period}</Text>
              {plan.savings && (
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsText}>{plan.savings}</Text>
                </View>
              )}
            </View>
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color="#4CAF50" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.selectButton, plan.popular && styles.popularButton]}
              onPress={() => router.push('/tabs/subscription/payment')}
            >
              <Text style={styles.selectButtonText}>Select Plan</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <Text style={styles.guaranteeText}>
          30-day money-back guarantee • Cancel anytime
        </Text>
      </ScrollView>
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
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#eee',
  },
  popularPlan: {
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 24,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#fff',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  planName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000',
  },
  priceContainer: {
    marginBottom: 24,
  },
  planPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#000',
  },
  planPeriod: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
  },
  savingsBadge: {
    position: 'absolute',
    right: 0,
    top: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#fff',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000',
  },
  selectButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  popularButton: {
    backgroundColor: '#FF6B6B',
  },
  selectButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  guaranteeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
});