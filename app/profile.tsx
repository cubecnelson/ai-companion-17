import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Heart, Star, Crown, CreditCard as Edit } from 'lucide-react-native';
import { router } from 'expo-router';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.push('/profile/edit')}
        >
          <Edit size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Alex Johnson</Text>
          <View style={styles.membershipBadge}>
            <Crown size={16} color="#FFD700" />
            <Text style={styles.membershipText}>Premium Member</Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Heart size={24} color="#FF6B6B" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>AI Companions</Text>
          </View>
          <View style={styles.statCard}>
            <Star size={24} color="#FFD700" />
            <Text style={styles.statNumber}>256</Text>
            <Text style={styles.statLabel}>Total Chats</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.activityItem}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop' }}
                  style={styles.activityAvatar}
                />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    Created a new AI companion named Luna
                  </Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FF6B6B',
  },
  editButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  membershipText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFD700',
  },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000',
    marginVertical: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000',
    marginBottom: 16,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
});