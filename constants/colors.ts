export const lightColors = {
  background: '#FFFFFF',
  text: '#000000',
  secondaryText: '#666666',
  border: '#EEEEEE',
  primary: '#FF6B6B',
  secondary: '#A490DC',
  card: '#FFFFFF',
  cardBorder: '#EEEEEE',
  input: '#F5F5F5',
  icon: '#000000',
  badge: '#FFD700',
  error: '#FF3B30',
  success: '#4CAF50',
};

export const darkColors = {
  background: '#000000',
  text: '#FFFFFF',
  secondaryText: '#999999',
  border: '#222222',
  primary: '#FF6B6B',
  secondary: '#A490DC',
  card: '#111111',
  cardBorder: '#222222',
  input: '#222222',
  icon: '#FFFFFF',
  badge: '#FFD700',
  error: '#FF453A',
  success: '#32D74B',
};

export function getColors(isDark: boolean) {
  return isDark ? darkColors : lightColors;
}