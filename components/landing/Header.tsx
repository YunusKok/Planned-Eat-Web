import { siteInfo } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    type SharedValue,
} from 'react-native-reanimated';

interface HeaderProps {
  scrollY?: SharedValue<number>;
}

export function Header({ scrollY }: HeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  
  const localScrollY = useSharedValue(0);
  const activeScrollY = scrollY ?? localScrollY;

  const scrollToSection = (sectionId: string) => {
    if (Platform.OS === 'web') {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Özellikler', id: 'features' },
    { label: 'Keşfet', id: 'media' },
    { label: 'Ekip', id: 'team' },
  ];

  // Animated header style with glassmorphism effect
  const animatedHeaderStyle = useAnimatedStyle(() => {
    const scrollValue = activeScrollY.value;
    
    // Background opacity: 0 at top, 1 after 50px scroll
    const backgroundOpacity = interpolate(
      scrollValue,
      [0, 50],
      [0, 1],
      Extrapolation.CLAMP
    );
    
    // Blur intensity increases with scroll
    const blurAmount = interpolate(
      scrollValue,
      [0, 100],
      [0, 20],
      Extrapolation.CLAMP
    );

    return {
      backgroundColor: colorScheme === 'dark' 
        ? `rgba(21, 23, 24, ${backgroundOpacity * 0.85})`
        : `rgba(255, 255, 255, ${backgroundOpacity * 0.85})`,
      borderBottomColor: colorScheme === 'dark'
        ? `rgba(55, 65, 81, ${backgroundOpacity})`
        : `rgba(229, 231, 235, ${backgroundOpacity})`,
      ...(Platform.OS === 'web' && {
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
      }),
      // Remove scale transform from header container to prevent layout issues
      transform: [],
    };
  });

  // Animated logo style
  const animatedLogoStyle = useAnimatedStyle(() => {
    const scrollValue = activeScrollY.value;
    
    const fontSize = interpolate(
      scrollValue,
      [0, 100],
      [24, 20],
      Extrapolation.CLAMP
    );

    return {
      fontSize,
    };
  });

  return (
    <Animated.View style={[styles.header, animatedHeaderStyle]}>
      <View style={styles.container}>
        <Animated.Text style={[styles.logo, { color: colors.primary }, animatedLogoStyle]}>
          🥗 {siteInfo.name}
        </Animated.Text>
        
        {/* Only show nav items on desktop */}
        {isDesktop && (
          <View style={styles.nav}>
            {navItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => scrollToSection(item.id)}
                style={({ pressed, hovered }) => [
                  styles.navItem,
                  pressed && styles.navItemPressed,
                  Platform.OS === 'web' && hovered && {
                    backgroundColor: colorScheme === 'dark' 
                      ? 'rgba(255,255,255,0.1)' 
                      : 'rgba(0,0,0,0.05)',
                  },
                ]}
              >
                <Text style={[styles.navText, { color: colors.text }]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <AnimatedButton
          onPress={() => scrollToSection('hero')}
          colors={colors}
        />
      </View>
    </Animated.View>
  );
}

// Animated CTA Button with hover effects
function AnimatedButton({ onPress, colors }: { onPress: () => void; colors: any }) {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.15);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadowOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  const handleHoverIn = () => {
    scale.value = withTiming(1.05, { duration: 200 });
    shadowOpacity.value = withTiming(0.3, { duration: 200 });
  };

  const handleHoverOut = () => {
    scale.value = withTiming(1, { duration: 200 });
    shadowOpacity.value = withTiming(0.15, { duration: 200 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...(Platform.OS === 'web' && {
        onHoverIn: handleHoverIn,
        onHoverOut: handleHoverOut,
      })}
    >
      <Animated.View
        style={[
          styles.ctaButton,
          { backgroundColor: colors.primary },
          animatedStyle,
          {
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 12,
            elevation: 8,
          },
        ]}
      >
        <Text style={styles.ctaText}>İndir</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
  },
  nav: {
    flexDirection: 'row',
    gap: 8,
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    ...(Platform.OS === 'web' && {
      transition: 'all 0.2s ease',
    } as any),
  },
  navItemPressed: {
    opacity: 0.7,
  },
  navText: {
    fontSize: 15,
    fontWeight: '500',
  },
  ctaButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
