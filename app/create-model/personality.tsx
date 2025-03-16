import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useState } from 'react';

const personalityTraits = [
  { id: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { id: 'formal', label: 'Formal', description: 'Professional and polite' },
  { id: 'humorous', label: 'Humorous', description: 'Witty and playful' },
  { id: 'empathetic', label: 'Empathetic', description: 'Understanding and caring' },
  { id: 'intellectual', label: 'Intellectual', description: 'Knowledgeable and analytical' },
  { id: 'creative', label: 'Creative', description: 'Imaginative and artistic' },
  { id: 'motivational', label: 'Motivational', description: 'Inspiring and encouraging' },
  { id: 'philosophical', label: 'Philosophical', description: 'Deep and contemplative' },
];

export default function PersonalityTraits() {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const toggleTrait = (traitId: string) => {
    setSelectedTraits((prev) =>
      prev.includes(traitId)
        ? prev.filter((id) => id !== traitId)
        : [...prev, traitId]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Personality Traits</Text>
        <Text style={styles.subtitle}>
          Select up to 3 personality traits that define your AI companion
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.traitsGrid}>
          {personalityTraits.map((trait) => (
            <TouchableOpacity
              key={trait.id}
              style={[
                styles.traitCard,
                selectedTraits.includes(trait.id) && styles.traitCardSelected,
              ]}
              onPress={() => toggleTrait(trait.id)}
              disabled={
                selectedTraits.length >= 3 && !selectedTraits.includes(trait.id)
              }
            >
              <View style={styles.traitHeader}>
                <Text style={styles.traitLabel}>{trait.label}</Text>
                {selectedTraits.includes(trait.id) && (
                  <Check size={20} color="#FF6B6B" />
                )}
              </View>
              <Text style={styles.traitDescription}>{trait.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedTraits.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={() => router.push('/create-model/language')}
          disabled={selectedTraits.length === 0}
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
  backButton: {
    marginBottom: 16,
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
  traitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  traitCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#eee',
  },
  traitCardSelected: {
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
  },
  traitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  traitLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000',
  },
  traitDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});