import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Check, Camera } from 'lucide-react-native';
import { useState } from 'react';

const avatarStyles = [
  {
    id: 'realistic',
    name: 'Realistic',
    samples: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'artistic',
    name: 'Artistic',
    samples: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 'anime',
    name: 'Anime',
    samples: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1621112904887-419379ce6824?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop',
    ],
  },
];

export default function ProfilePicture() {
  const [selectedStyle, setSelectedStyle] = useState<string>('realistic');
  const [selectedImage, setSelectedImage] = useState<string>(avatarStyles[0].samples[0]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Picture</Text>
        <Text style={styles.subtitle}>
          Choose a style and select an avatar for your AI companion
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.selectedPreview}>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          <TouchableOpacity style={styles.uploadButton}>
            <Camera size={24} color="#fff" />
            <Text style={styles.uploadButtonText}>Upload Custom</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Choose Style</Text>
        <View style={styles.styleGrid}>
          {avatarStyles.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleCard,
                selectedStyle === style.id && styles.styleCardSelected,
              ]}
              onPress={() => setSelectedStyle(style.id)}
            >
              <Text style={styles.styleName}>{style.name}</Text>
              {selectedStyle === style.id && (
                <View style={styles.checkmark}>
                  <Check size={16} color="#4CAF50" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Sample Avatars</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.samplesContainer}
        >
          {avatarStyles
            .find((style) => style.id === selectedStyle)
            ?.samples.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sampleImageContainer,
                  selectedImage === image && styles.sampleImageSelected,
                ]}
                onPress={() => setSelectedImage(image)}
              >
                <Image source={{ uri: image }} style={styles.sampleImage} />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/create-model/review')}
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
  selectedPreview: {
    alignItems: 'center',
    marginBottom: 24,
  },
  previewImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  uploadButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000',
    marginBottom: 16,
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  styleCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  styleCardSelected: {
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
  },
  styleName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
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
  samplesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  sampleImageContainer: {
    marginRight: 12,
    borderRadius: 12,
    padding: 4,
  },
  sampleImageSelected: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  sampleImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
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