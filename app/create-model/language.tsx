import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Check, Globe } from 'lucide-react-native';
import { useState } from 'react';

const languages = [
  {
    id: 'en',
    name: 'English',
    proficiency: ['Native', 'Fluent', 'Conversational'],
    description: 'Global language of business and technology',
  },
  {
    id: 'es',
    name: 'Spanish',
    proficiency: ['Native', 'Fluent', 'Conversational'],
    description: 'Second most spoken language by native speakers',
  },
  {
    id: 'fr',
    name: 'French',
    proficiency: ['Native', 'Fluent', 'Conversational'],
    description: 'Language of diplomacy and culture',
  },
  {
    id: 'de',
    name: 'German',
    proficiency: ['Native', 'Fluent', 'Conversational'],
    description: 'Language of science and engineering',
  },
  {
    id: 'zh',
    name: 'Chinese (Mandarin)',
    proficiency: ['Native', 'Fluent', 'Conversational'],
    description: 'Most spoken language in the world',
  },
  {
    id: 'ja',
    name: 'Japanese',
    proficiency: ['Native', 'Fluent', 'Conversational'],
    description: 'Language of technology and innovation',
  },
  {
    id: 'ko',
    name: 'Korean',
    proficiency: ['Native', 'Fluent', 'Conversational'],
    description: 'Rapidly growing global influence',
  },
  {
    id: 'ar',
    name: 'Arabic',
    proficiency: ['Native', 'Fluent', 'Conversational'],
    description: 'Official language in 26 countries',
  },
];

type SelectedLanguage = {
  id: string;
  proficiency: string;
};

export default function LanguagePreferences() {
  const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguage[]>([
    { id: 'en', proficiency: 'Native' },
  ]);

  const toggleLanguage = (languageId: string, proficiency: string) => {
    setSelectedLanguages((prev) => {
      const isSelected = prev.some((lang) => lang.id === languageId);
      if (isSelected) {
        // Update proficiency if already selected
        return prev.map((lang) =>
          lang.id === languageId ? { ...lang, proficiency } : lang
        );
      }
      // Add new language if not at limit
      if (prev.length < 3) {
        return [...prev, { id: languageId, proficiency }];
      }
      return prev;
    });
  };

  const isLanguageSelected = (languageId: string) => {
    return selectedLanguages.some((lang) => lang.id === languageId);
  };

  const getSelectedProficiency = (languageId: string) => {
    const language = selectedLanguages.find((lang) => lang.id === languageId);
    return language?.proficiency;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Language Preferences</Text>
        <Text style={styles.subtitle}>
          Select up to 3 languages and their proficiency levels for your AI companion
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.languagesGrid}>
          {languages.map((language) => (
            <View key={language.id} style={styles.languageCard}>
              <View style={styles.languageHeader}>
                <View style={styles.languageIcon}>
                  <Globe size={24} color="#FF6B6B" />
                </View>
                <Text style={styles.languageName}>{language.name}</Text>
                {isLanguageSelected(language.id) && (
                  <View style={styles.checkmark}>
                    <Check size={16} color="#4CAF50" />
                  </View>
                )}
              </View>
              <Text style={styles.languageDescription}>
                {language.description}
              </Text>
              <View style={styles.proficiencyContainer}>
                {language.proficiency.map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.proficiencyButton,
                      isLanguageSelected(language.id) &&
                        getSelectedProficiency(language.id) === level &&
                        styles.proficiencyButtonSelected,
                      selectedLanguages.length >= 3 &&
                        !isLanguageSelected(language.id) &&
                        styles.proficiencyButtonDisabled,
                    ]}
                    onPress={() => toggleLanguage(language.id, level)}
                    disabled={
                      selectedLanguages.length >= 3 &&
                      !isLanguageSelected(language.id)
                    }
                  >
                    <Text
                      style={[
                        styles.proficiencyText,
                        isLanguageSelected(language.id) &&
                          getSelectedProficiency(language.id) === level &&
                          styles.proficiencyTextSelected,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedLanguages.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={() => router.push('/create-model/tone')}
          disabled={selectedLanguages.length === 0}
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
  languagesGrid: {
    gap: 16,
  },
  languageCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
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
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  languageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  languageName: {
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
  languageDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  proficiencyContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  proficiencyButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  proficiencyButtonSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  proficiencyButtonDisabled: {
    opacity: 0.5,
  },
  proficiencyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  proficiencyTextSelected: {
    color: '#fff',
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