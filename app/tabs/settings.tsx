import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Image, Text, useColorScheme } from 'react-native';
import { Bell, Lock, CreditCard, CircleHelp as HelpCircle, LogOut, MessageSquare, Palette, Volume2, Globe as Globe2, Sparkles, Heart, Shield, Clock, Moon, Sun, Monitor } from 'lucide-react-native';
import { router } from 'expo-router';
import { signOut } from '@/services/auth';
import ProfileHeader from '@/components/ProfileHeader';
import { useState, useEffect } from 'react';

type ThemeMode = 'system' | 'dark' | 'light';

const settingsSections = [
  {
    title: 'Account',
    items: [
      {
        icon: Lock,
        label: 'Privacy',
        type: 'link',
        description: 'Manage your privacy settings',
      },
      {
        icon: Shield,
        label: 'Security',
        type: 'link',
        description: 'Two-factor authentication, password',
      },
      {
        icon: CreditCard,
        label: 'Subscription',
        type: 'link',
        description: 'Manage your premium subscription',
        badge: 'Premium',
      },
    ],
  },
  {
    title: 'Appearance',
    items: [
      {
        icon: Palette,
        label: 'Theme',
        type: 'theme',
        description: 'Choose your preferred theme',
      },
    ],
  },
  {
    title: 'Preferences',
    items: [
      {
        icon: Bell,
        label: 'Notifications',
        type: 'toggle',
        value: true,
        description: 'Push notifications and alerts',
      },
      {
        icon: MessageSquare,
        label: 'Chat Settings',
        type: 'link',
        description: 'Message history, auto-replies',
      },
      {
        icon: Volume2,
        label: 'Sound & Haptics',
        type: 'link',
        description: 'Message sounds, vibrations',
      },
      {
        icon: Globe2,
        label: 'Language',
        type: 'link',
        description: 'App language, translations',
        value: 'English',
      },
    ],
  },
  {
    title: 'AI Companions',
    items: [
      {
        icon: Sparkles,
        label: 'AI Model Settings',
        type: 'link',
        description: 'Model preferences, behavior',
      },
      {
        icon: Heart,
        label: 'Relationship Settings',
        type: 'link',
        description: 'Love meter, interaction style',
      },
      {
        icon: Clock,
        label: 'Activity History',
        type: 'link',
        description: 'Past interactions, analytics',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        icon: HelpCircle,
        label: 'Help Center',
        type: 'link',
        description: 'FAQs, contact support',
      },
    ],
  },
];

const themeOptions: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
  {
    id: 'system',
    label: 'System',
    icon: Monitor,
  },
  {
    id: 'light',
    label: 'Light',
    icon: Sun,
  },
  {
    id: 'dark',
    label: 'Dark',
    icon: Moon,
  },
];

const handleLogOut = async () => {
  try {
    await signOut();
    router.replace('/auth/sign-in');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

const onSettingsRowPressed = (rowName: string) => {
  if (rowName === 'Subscription') {
    router.push('/subscription');
  }
};

export default function Settings() {
  const systemColorScheme = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Update the actual theme based on selection and system preference
    if (selectedTheme === 'system') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(selectedTheme === 'dark');
    }
  }, [selectedTheme, systemColorScheme]);

  const ThemePreview = () => (
    <View style={[styles.themePreview, isDark && styles.themePreviewDark]}>
      <View style={[styles.previewHeader, isDark && styles.previewHeaderDark]}>
        <View style={styles.previewTitle} />
      </View>
      <View style={styles.previewContent}>
        <View style={[styles.previewCard, isDark && styles.previewCardDark]}>
          <View style={styles.previewCardContent}>
            <View style={[styles.previewText, isDark && styles.previewTextDark]} />
            <View style={[styles.previewText, isDark && styles.previewTextDark, { width: '60%' }]} />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <ProfileHeader title="Settings" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              {section.title}
            </Text>
            <View style={[styles.sectionContent, isDark && styles.sectionContentDark]}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  {item.type === 'theme' ? (
                    <View style={styles.themeSection}>
                      <ThemePreview />
                      <View style={styles.themeOptions}>
                        {themeOptions.map((option) => (
                          <TouchableOpacity
                            key={option.id}
                            style={[
                              styles.themeOption,
                              selectedTheme === option.id && styles.themeOptionSelected,
                              isDark && styles.themeOptionDark,
                              selectedTheme === option.id && isDark && styles.themeOptionSelectedDark,
                            ]}
                            onPress={() => setSelectedTheme(option.id)}
                          >
                            <option.icon
                              size={24}
                              color={selectedTheme === option.id ? '#fff' : isDark ? '#fff' : '#000'}
                            />
                            <Text
                              style={[
                                styles.themeOptionText,
                                selectedTheme === option.id && styles.themeOptionTextSelected,
                                isDark && styles.themeOptionTextDark,
                              ]}
                            >
                              {option.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.settingItem,
                        itemIndex === section.items.length - 1 && styles.lastSettingItem,
                        isDark && styles.settingItemDark,
                      ]}
                      onPress={() => onSettingsRowPressed(item.label)}
                      disabled={item.type === 'toggle'}
                    >
                      <View style={styles.settingLeft}>
                        <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                          <item.icon size={24} color={isDark ? '#fff' : '#A490DC'} />
                        </View>
                        <View style={styles.settingTexts}>
                          <Text style={[styles.settingLabel, isDark && styles.settingLabelDark]}>
                            {item.label}
                          </Text>
                          <Text style={[styles.settingDescription, isDark && styles.settingDescriptionDark]}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.settingRight}>
                        {item.type === 'toggle' ? (
                          <Switch
                            value={item.value}
                            onValueChange={() => {}}
                            trackColor={{ false: isDark ? '#333' : '#eee', true: '#ffc7c7' }}
                            thumbColor={item.value ? '#FF6B6B' : isDark ? '#666' : '#fff'}
                          />
                        ) : (
                          <View style={styles.settingRightContent}>
                            {item.badge && (
                              <View style={styles.badge}>
                                <Text style={styles.badgeText}>{item.badge}</Text>
                              </View>
                            )}
                            {item.value && (
                              <Text style={[styles.settingValue, isDark && styles.settingValueDark]}>
                                {item.value}
                              </Text>
                            )}
                            <Text style={[styles.chevron, isDark && styles.chevronDark]}>›</Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
          <LogOut size={24} color="#FFF" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, isDark && styles.versionTextDark]}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  sectionTitleDark: {
    color: '#999',
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionContentDark: {
    backgroundColor: '#111',
  },
  themeSection: {
    padding: 16,
  },
  themePreview: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  themePreviewDark: {
    backgroundColor: '#222',
  },
  previewHeader: {
    height: 60,
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  previewHeaderDark: {
    backgroundColor: '#111',
    borderBottomColor: '#333',
  },
  previewTitle: {
    width: '40%',
    height: 24,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  previewContent: {
    padding: 16,
  },
  previewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  previewCardDark: {
    backgroundColor: '#111',
  },
  previewCardContent: {
    gap: 8,
  },
  previewText: {
    height: 12,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  previewTextDark: {
    backgroundColor: '#333',
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  themeOptionDark: {
    backgroundColor: '#222',
  },
  themeOptionSelected: {
    backgroundColor: '#000',
  },
  themeOptionSelectedDark: {
    backgroundColor: '#333',
  },
  themeOptionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#000',
  },
  themeOptionTextDark: {
    color: '#fff',
  },
  themeOptionTextSelected: {
    color: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  settingItemDark: {
    borderBottomColor: '#222',
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(164, 144, 220, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingTexts: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  settingLabelDark: {
    color: '#fff',
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  settingDescriptionDark: {
    color: '#999',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  settingValueDark: {
    color: '#999',
  },
  badge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#000',
  },
  chevron: {
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    color: '#666',
    marginLeft: 4,
  },
  chevronDark: {
    color: '#999',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  versionTextDark: {
    color: '#999',
  },
});