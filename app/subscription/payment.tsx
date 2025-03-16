import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { CreditCard, Lock } from 'lucide-react-native';

export default function Payment() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Details</Text>
        <Text style={styles.subtitle}>
          Enter your payment information securely
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.secureNotice}>
          <Lock size={20} color="#4CAF50" />
          <Text style={styles.secureText}>
            Your payment information is secure and encrypted
          </Text>
        </View>

        <View style={styles.cardSection}>
          <View style={styles.cardPreview}>
            <CreditCard size={32} color="#FF6B6B" />
            <Text style={styles.cardPreviewText}>Credit or Debit Card</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              keyboardType="number-pad"
              maxLength={19}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name on Card</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Plan</Text>
            <Text style={styles.summaryValue}>Monthly Premium</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount</Text>
            <Text style={styles.summaryValue}>$9.99/month</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$9.99</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => router.push('/tabs/subscription/success')}
        >
          <Lock size={20} color="#fff" />
          <Text style={styles.payButtonText}>Pay Securely</Text>
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
  secureNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  secureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4CAF50',
    flex: 1,
  },
  cardSection: {
    marginBottom: 32,
  },
  cardPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  cardPreviewText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  summarySection: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  totalLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#000',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FF6B6B',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  payButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  payButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});