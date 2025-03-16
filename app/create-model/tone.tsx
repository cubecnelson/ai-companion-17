import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MessageSquare, Check } from 'lucide-react-native';
import { useState } from 'react';

const toneOptions = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Formal and business-like communication style',
    examples: ['I understand your concern.', 'Let me assist you with that.'],
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Relaxed and friendly communication style',
    examples: ['Hey there!', 'No worries, I got you covered!'],
  },
  {
    id: 'empathetic',
    name: 'Empathetic',
    description: 'Understanding and compassionate approach',
    examples: ['I hear how difficult this is.', 'Your feelings are valid.'],
  },
  {
    id: 'enthusiastic',
    name: 'Enthusiastic',
    description: 'Energetic and positive communication',
    examples: ['That\'s awesome!', 'I\'m excited to help!'],
  },
  {
    id: 'analytical',
    name: 'Analytical',
    description: 'Logical and detail-oriented approach',
    examples: ['Let\'s examine the data.', 'Here\'s a systematic approach.'],
  },
];

export default function ToneOfVoice() {
  const [selectedTone, setSelectedTone] = useState<string>('professional');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tone of Voice</Text>
        <Text style={styles.subtitle}>
          Choose how your AI companion will communicate with users
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {toneOptions.map((tone) => (
          <TouchableOpacity
            key={tone.id}
            style={[
              styles.toneCard,
              selectedTone === tone.id && styles.toneCardSelected,
            ]}
            onPress={() => setSelectedTone(tone.id)}
          >
            <View style={styles.toneHeader}>
              <View style={styles.toneIcon}>
                <MessageSquare size={24} color="#FF6B6B" />
              </View>
              <Text style={styles.toneName}>{tone.name}</Text>
              {selectedTone === tone.id && (
                <View style={styles.checkmark}>
                  <Check size={16} color="#4CAF50" />
                </View>
              )}
            </View>
            <Text style={styles.toneDescription}>{tone.description}</Text>
            <View style={styles.examplesContainer}>
              <Text style={styles.examplesTitle}>Example responses:</Text>
              {tone.examples.map((example, index) => (
                <View key={index} style={styles.exampleBubble}>
                  <Text style={styles.exampleText}>{example}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/create-model/prompts')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  toneCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toneCardSelected: {
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
  },
  toneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  toneIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  toneName: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toneDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  examplesContainer: {
    backgroundColor: 'rgba(164, 144, 220, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  examplesTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  exampleBubble: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(164, 144, 220, 0.2)',
  },
  exampleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  continueButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});