import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  Dimensions,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, ChevronDown } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;
const SCROLL_EXTENT = Math.floor(VISIBLE_ITEMS / 2);

export default function AgeVerification() {
  const currentYear = new Date().getFullYear();
  const defaultYear = currentYear - 18;
  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);
  
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [tempYear, setTempYear] = useState(defaultYear);
  const [error, setError] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (showPicker) {
      const selectedIndex = years.indexOf(tempYear);
      if (selectedIndex !== -1 && scrollViewRef.current) {
        const yOffset = selectedIndex * ITEM_HEIGHT;
        requestAnimationFrame(() => {
          scrollViewRef.current?.scrollTo({
            y: yOffset,
            animated: false,
          });
          setScrollPosition(yOffset);
        });
      }
    }
  }, [showPicker]);

  const snapToYear = (y: number) => {
    const index = Math.round(y / ITEM_HEIGHT);
    const snappedPosition = index * ITEM_HEIGHT;
    const year = years[Math.max(0, Math.min(index, years.length - 1))];
    
    if (year) {
      setTempYear(year);
      setScrollPosition(snappedPosition);
      scrollViewRef.current?.scrollTo({
        y: snappedPosition,
        animated: true,
      });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    setScrollPosition(y);
    
    if (!isScrolling) {
      const index = Math.round(y / ITEM_HEIGHT);
      const year = years[Math.max(0, Math.min(index, years.length - 1))];
      if (year && year !== tempYear) {
        setTempYear(year);
      }
    }
  };

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
    snapToYear(scrollPosition);
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    snapToYear(y);
  };

  const handleConfirm = () => {
    setSelectedYear(tempYear);
    setShowPicker(false);
  };

  const verifyAge = () => {
    if (!selectedYear) {
      setError('Please select your birth year');
      return;
    }

    const age = currentYear - selectedYear;
    if (age >= 18) {
      router.replace('/tabs');
    } else {
      setError('You must be 18 or older to use this app');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#FF6B6B" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Age Verification</Text>
        <Text style={styles.description}>
          Please select your birth year to continue. You must be 18 or older to
          use AI Soulmate.
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.inputHeader}>
            <Calendar size={24} color="#FF6B6B" />
            <Text style={styles.inputLabel}>Birth Year</Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.yearButton,
              !selectedYear && styles.yearButtonPlaceholder
            ]}
            onPress={() => setShowPicker(true)}
          >
            <Text style={[
              styles.yearButtonText,
              !selectedYear && styles.yearButtonPlaceholderText
            ]}>
              {selectedYear ? selectedYear.toString() : 'Select your birth year'}
            </Text>
            <ChevronDown size={20} color="#666" />
          </TouchableOpacity>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity 
            style={[
              styles.button,
              !selectedYear && styles.buttonDisabled
            ]} 
            onPress={verifyAge}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By continuing, you agree to our Terms of Service and confirm that you
            are 18 years or older.
          </Text>
        </View>
      </View>

      <Modal
        visible={showPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPicker(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowPicker(false)}
        >
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Birth Year</Text>
            </View>

            <View style={styles.pickerWrapper}>
              <View style={styles.pickerOverlay}>
                <View style={styles.pickerHighlight} />
              </View>
              
              <ScrollView
                ref={scrollViewRef}
                style={styles.picker}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onScroll={handleScroll}
                onScrollBeginDrag={handleScrollBegin}
                onScrollEndDrag={handleScrollEnd}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                scrollEventThrottle={16}
              >
                <View style={{ height: ITEM_HEIGHT * SCROLL_EXTENT }} />
                {years.map((year) => (
                  <View key={year} style={styles.yearItem}>
                    <Text
                      style={[
                        styles.yearText,
                        year === tempYear && styles.selectedYearText,
                      ]}
                    >
                      {year}
                    </Text>
                  </View>
                ))}
                <View style={{ height: ITEM_HEIGHT * SCROLL_EXTENT }} />
              </ScrollView>
            </View>

            <View style={styles.pickerActions}>
              <TouchableOpacity 
                style={[styles.pickerButton, styles.cancelButton]} 
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pickerButton, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'web' ? 80 : 100,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
    color: '#FF6B6B',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  inputLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000',
  },
  yearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  yearButtonPlaceholder: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  yearButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000',
  },
  yearButtonPlaceholderText: {
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    padding: 20,
  },
  pickerHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#000',
  },
  pickerWrapper: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    position: 'relative',
    marginBottom: 20,
  },
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  pickerHighlight: {
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 107, 0.1)',
  },
  picker: {
    flex: 1,
  },
  yearItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearText: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: '#666',
  },
  selectedYearText: {
    fontFamily: 'Inter-Bold',
    color: '#FF6B6B',
    fontSize: 24,
  },
  pickerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  pickerButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  confirmButton: {
    backgroundColor: '#000',
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#666',
  },
  confirmButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  error: {
    fontFamily: 'Inter-Regular',
    color: '#FF6B6B',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 18,
  },
  disclaimer: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});