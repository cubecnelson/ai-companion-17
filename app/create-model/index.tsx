import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Brain, ChevronRight } from 'lucide-react-native';

const steps = [
  {
    title: 'Personality Traits',
    description: 'Define the core characteristics of your AI companion',
    route: 'personality',
    icon: Brain,
  },
  {
    title: 'Language Preferences',
    description: 'Choose the languages your AI can communicate in',
    route: 'language',
    icon: Brain,
  },
  {
    title: 'Tone of Voice',
    description: 'Set the communication style of your AI',
    route: 'tone',
    icon: Brain,
  },
  {
    title: 'Conversation Starters',
    description: 'Add predefined prompts for engaging conversations',
    route: 'prompts',
    icon: Brain,
  },
  {
    title: 'Profile Picture',
    description: 'Give your AI companion a unique visual identity',
    route: 'avatar',
    icon: Brain,
  },
];

export default function CreateModel() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create AI Companion</Text>
        <Text style={styles.subtitle}>
          Follow these steps to create your perfect AI companion
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {steps.map((step, index) => (
          <TouchableOpacity
            key={step.route}
            style={styles.stepCard}
            onPress={() => router.push(`/create-model/${step.route}`)}
          >
            <View style={styles.stepIcon}>
              <step.icon size={24} color="#FF6B6B" />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
            <ChevronRight size={24} color="#A490DC" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => router.push('/tabs/create/review')}
        >
          <Text style={styles.reviewButtonText}>Review & Create</Text>
        </TouchableOpacity>
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
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
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
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000',
    marginBottom: 4,
  },
  stepDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  reviewButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  reviewButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});