import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const iconMap: Record<string, string> = {
  'sparkles': '✨',
  'chart-bar': '📊',
  'shopping-cart': '🛒',
  'calendar': '📅',
  'heart': '❤️',
  'clock': '⏰',
  'star': '⭐',
  'bolt': '⚡',
};

export function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const isLarge = index === 0 || index === 3;

  // Animation values
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.08);
  const iconScale = useSharedValue(1);

  const handleHoverIn = () => {
    translateY.value = withSpring(-8, { damping: 15, stiffness: 300 });
    scale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
    shadowOpacity.value = withTiming(0.2, { duration: 200 });
    iconScale.value = withSpring(1.1, { damping: 10, stiffness: 400 });
  };

  const handleHoverOut = () => {
    translateY.value = withSpring(0, { damping: 15, stiffness: 300 });
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    shadowOpacity.value = withTiming(0.08, { duration: 200 });
    iconScale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    shadowOpacity: shadowOpacity.value,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...(Platform.OS === 'web' && {
        onHoverIn: handleHoverIn,
        onHoverOut: handleHoverOut,
      })}
      style={{ flex: 1, minWidth: isLarge ? 320 : 280 }}
    >
      <Animated.View
        style={[
          styles.card,
          isLarge && styles.cardLarge,
          {
            backgroundColor: colors.cardBg,
            borderColor: colors.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowRadius: 24,
            elevation: 8,
          },
          animatedCardStyle,
        ]}
      >
        <Animated.View style={[styles.iconContainer, { backgroundColor: colors.surface }, animatedIconStyle]}>
          <Text style={styles.icon}>{iconMap[icon] || '🍽️'}</Text>
        </Animated.View>
        
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        
        <Text style={[styles.description, { color: colors.muted }]}>
          {description}
        </Text>

        <View style={[styles.decorAccent, { backgroundColor: colors.primary, opacity: 0.1 }]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 28,
    borderRadius: 24,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'border-color 0.2s ease',
    }),
  },
  cardLarge: {
    // Large cards can have different styling if needed
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  decorAccent: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    bottom: -50,
    right: -50,
  },
});
