import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { Plus, Heart, Sparkles, Star } from 'lucide-react-native';
import ProfileHeader from '@/components/ProfileHeader';
import Animated, { 
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
} from 'react-native-reanimated';
import { useState, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { getColors } from '@/constants/colors';

const companions = [
  {
    id: '1',
    name: 'Luna',
    modelName: 'GPT-4 Turbo',
    description: 'Empathetic and caring companion',
    catchphrase: "Life's beauty lies in the little moments we share ✨",
    loveLevel: 78,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Atlas',
    modelName: 'Claude 3',
    description: 'Intellectual and philosophical guide',
    catchphrase: "Knowledge is the compass of life 🧭",
    loveLevel: 92,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Nova',
    modelName: 'GPT-4',
    description: 'Creative and inspiring muse',
    catchphrase: "Every day is a canvas waiting to be painted 🎨",
    loveLevel: 85,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Sage',
    modelName: 'Claude 3 Opus',
    description: 'Wise and thoughtful mentor',
    catchphrase: "Wisdom whispers in the silence 🍃",
    loveLevel: 71,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'Echo',
    modelName: 'GPT-4 Vision',
    description: 'Artistic soul with a poetic heart',
    catchphrase: "In art we find our truest reflection 🎭",
    loveLevel: 88,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&fit=crop',
  },
];

const tabs = [
  { 
    id: 'recommended', 
    label: 'Recommended',
    icon: Sparkles
  },
  { 
    id: 'topRated', 
    label: 'Top Rated',
    icon: Star
  },
] as const;

type TabType = typeof tabs[number]['id'];

export default function Home() {
  const { width: windowWidth } = useWindowDimensions();
  const scrollX = useSharedValue(0);
  const ITEM_SIZE = windowWidth * 0.85;
  const [activeTab, setActiveTab] = useState<TabType>('recommended');
  const { isDark } = useTheme();
  const colors = getColors(isDark);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const navigateToChat = useCallback((companionId: string) => {
    router.push(`/chat/${companionId}`);
  }, []);

  const CompanionCard = ({ item, index }: { item: typeof companions[0], index: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 2) * ITEM_SIZE,
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
        (index + 1) * ITEM_SIZE,
        (index + 2) * ITEM_SIZE,
      ];

      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.8, 0.9, 1, 0.9, 0.8],
        'clamp'
      );

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.6, 0.8, 1, 0.8, 0.6],
        'clamp'
      );

      return {
        transform: [
          { scale: withSpring(scale, { damping: 20, stiffness: 90 }) },
        ],
        opacity: withSpring(opacity, { damping: 20, stiffness: 90 }),
      };
    });

    return (
      <TouchableOpacity
        onPress={() => navigateToChat(item.id)}
        style={[
          styles.companionCardContainer,
          { width: ITEM_SIZE },
        ]}
        activeOpacity={0.9}
      >
        <Animated.View style={[
          styles.companionCard,
          { backgroundColor: colors.card },
          animatedStyle
        ]}>
          <View style={styles.modelBadge}>
            <Text style={styles.modelName}>{item.modelName}</Text>
          </View>
          
          <Image
            source={{ uri: item.avatar }}
            style={styles.companionAvatar}
          />

          <View style={styles.companionInfo}>
            <Text style={[styles.companionName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.companionDescription, { color: colors.secondaryText }]}>
              {item.description}
            </Text>

            <View style={[styles.catchphraseContainer, { backgroundColor: colors.input }]}>
              <Text style={[styles.catchphrase, { color: colors.secondaryText }]}>
                "{item.catchphrase}"
              </Text>
            </View>

            <View style={[styles.loveMeterContainer, { 
              backgroundColor: colors.card,
              borderColor: colors.border
            }]}>
              <Heart 
                size={20} 
                color={item.loveLevel >= 80 ? '#FF6B6B' : '#FFB6B6'} 
                fill={item.loveLevel >= 80 ? '#FF6B6B' : '#FFB6B6'}
              />
              <View style={[styles.loveMeterBar, { backgroundColor: colors.input }]}>
                <View 
                  style={[
                    styles.loveMeterProgress, 
                    { width: `${item.loveLevel}%` }
                  ]} 
                />
              </View>
              <Text style={[styles.loveMeterText, { color: colors.secondaryText }]}>
                {item.loveLevel}%
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ProfileHeader title="AI Soulmates" />

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <View style={[styles.tabsWrapper, { backgroundColor: colors.input }]}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && [styles.activeTab, { backgroundColor: colors.text }],
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <tab.icon
                  size={20}
                  color={activeTab === tab.id ? colors.background : colors.secondaryText}
                />
                <Text style={[
                  styles.tabText,
                  { color: colors.secondaryText },
                  activeTab === tab.id && [styles.activeTabText, { color: colors.background }]
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: (windowWidth - ITEM_SIZE) / 2 },
          ]}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          {companions.map((companion, index) => (
            <CompanionCard
              key={companion.id}
              item={companion}
              index={index}
            />
          ))}
        </Animated.ScrollView>

        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.text }]}
          onPress={() => router.push('/create-model')}
        >
          <Plus size={24} color={colors.background} />
          <Text style={[styles.createButtonText, { color: colors.background }]}>
            Create My Own
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  tabsWrapper: {
    flexDirection: 'row',
    gap: 12,
    padding: 6,
    borderRadius: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  companionCardContainer: {
    paddingHorizontal: 10,
  },
  companionCard: {
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    height: 420,
  },
  modelBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  modelName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#fff',
  },
  companionAvatar: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    marginBottom: 16,
  },
  companionInfo: {
    alignItems: 'center',
    width: '100%',
  },
  companionName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    marginBottom: 6,
  },
  companionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  catchphraseContainer: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  catchphrase: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
  loveMeterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  loveMeterBar: {
    width: 100,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  loveMeterProgress: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 3,
  },
  loveMeterText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 16,
    gap: 8,
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});