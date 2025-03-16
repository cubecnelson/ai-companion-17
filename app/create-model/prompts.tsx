import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Plus, X } from 'lucide-react-native';
import { useState } from 'react';

const defaultPrompts = [
  "Tell me about your day",
  "What's your favorite book?",
  "How do you handle stress?",
  "What makes you happy?",
];

export default function ConversationStarters() {
  const [prompts, setPrompts] = useState<string[]>(defaultPrompts);
  const [newPrompt, setNewPrompt] = useState('');

  const addPrompt = () => {
    if (newPrompt.trim() && prompts.length < 10) {
      setPrompts([...prompts, newPrompt.trim()]);
      setNewPrompt('');
    }
  };

  const removePrompt = (index: number) => {
    setPrompts(prompts.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversation Starters</Text>
        <Text style={styles.subtitle}>
          Add up to 10 prompts that users can quickly select to start conversations
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newPrompt}
            onChangeText={setNewPrompt}
            placeholder="Type a conversation starter..."
            maxLength={100}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.addButton,
              (!newPrompt.trim() || prompts.length >= 10) && styles.addButtonDisabled,
            ]}
            onPress={addPrompt}
            disabled={!newPrompt.trim() || prompts.length >= 10}
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.promptsCount}>
          {prompts.length}/10 prompts added
        </Text>

        <View style={styles.promptsList}>
          {prompts.map((prompt, index) => (
            <View key={index} style={styles.promptItem}>
              <Text style={styles.promptText}>{prompt}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePrompt(index)}
              >
                <X size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            prompts.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={() => router.push('/create-model/avatar')}
          disabled={prompts.length === 0}
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
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    maxHeight: 100,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  promptsCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  promptsList: {
    gap: 12,
  },
  promptItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promptText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000',
  },
  removeButton: {
    padding: 8,
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