import { heroContent } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { StoreButton } from './StoreButton';

interface HeroSectionProps {
  scrollY?: SharedValue<number>;
}

export function HeroSection({ scrollY }: HeroSectionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  
  const localScrollY = useSharedValue(0);
  const activeScrollY = scrollY ?? localScrollY;

  // Entry animations
  const badgeOpacity = useSharedValue(0);
  const badgeTranslateY = useSharedValue(-20);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(20);
  const statsOpacity = useSharedValue(0);
  const phoneScale = useSharedValue(0.8);
  const phoneOpacity = useSharedValue(0);
  const phoneRotate = useSharedValue(-5);

  // Decor circle animations
  const decor1Scale = useSharedValue(1);
  const decor2Scale = useSharedValue(1);

  useEffect(() => {
    // ... existing entry animations ...
    badgeOpacity.value = withDelay(100, withTiming(1, { duration: 800 }));
    badgeTranslateY.value = withDelay(100, withTiming(0, { duration: 800 }));

    titleOpacity.value = withDelay(200, withTiming(1, { duration: 800 }));
    titleTranslateY.value = withDelay(200, withTiming(0, { duration: 800 }));

    subtitleOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));

    buttonsOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    buttonsTranslateY.value = withDelay(600, withTiming(0, { duration: 800 }));

    statsOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));

    phoneOpacity.value = withDelay(300, withTiming(1, { duration: 1000 }));
    phoneScale.value = withDelay(300, withTiming(1, { duration: 1000 }));
    phoneRotate.value = withDelay(300, withTiming(0, { duration: 1000 }));

    // Continuous breathing animation for decor circles
    decor1Scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    decor2Scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  // ... existing style definitions ...

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ translateY: badgeTranslateY.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  const statsStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
  }));

  const phoneStyle = useAnimatedStyle(() => {
    // Subtle, professional parallax effect
    const translateY = interpolate(activeScrollY.value, [0, 800], [0, 60]); // Gentle movement
    const rotate = interpolate(activeScrollY.value, [0, 800], [0, 3]); // Very subtle rotation
    const scale = interpolate(activeScrollY.value, [0, 800], [1, 0.95]); // Slight shrink as it moves away
    const opacity = interpolate(activeScrollY.value, [0, 600], [1, 0.85]); // Fade slightly
    
    return {
      opacity: phoneOpacity.value * opacity,
      transform: [
        { scale: phoneScale.value },
        { scale: scale },
        { rotate: `${phoneRotate.value + rotate}deg` },
        { translateY: translateY },
      ],
    };
  });

  const decor1Style = useAnimatedStyle(() => {
    const parallaxY = interpolate(activeScrollY.value, [0, 600], [0, -50]); // Moves up slightly
    return {
      transform: [
        { scale: decor1Scale.value },
        { translateY: parallaxY },
      ],
    };
  });

  const decor2Style = useAnimatedStyle(() => {
    const parallaxY = interpolate(activeScrollY.value, [0, 600], [0, 30]); // Moves down slightly
    return {
      transform: [
        { scale: decor2Scale.value },
        { translateY: parallaxY },
      ],
    };
  });

  return (
    <View
      id="hero"
      // ... same as before
      style={[
        styles.hero,
        {
          backgroundColor: 'transparent',
          paddingTop: isDesktop ? 120 : 140, // Increased for mobile to prevent header overlap
        },
      ]}
    >
      <View style={[styles.container, isDesktop && styles.containerDesktop]}>
        {/* Text Content */}
        <View style={[styles.textContent, isDesktop && styles.textContentDesktop]}>
             {/* ... same text content ... */}
          <Animated.Text style={[styles.badge, { backgroundColor: colors.surfaceAlt, color: colors.primary }, badgeStyle]}>
            🚀 Next Generation Nutrition App
          </Animated.Text>
          
          <Animated.Text style={[styles.title, { color: colors.text, fontSize: isDesktop ? 52 : 36, lineHeight: isDesktop ? 62 : 44 }, titleStyle]}>
            {heroContent.title}
          </Animated.Text>
          
          <Animated.Text style={[styles.subtitle, { color: colors.muted }, subtitleStyle]}>
            {heroContent.subtitle}
          </Animated.Text>

          <Animated.View style={[styles.storeButtons, buttonsStyle]}>
            <StoreButton type="apple" url={heroContent.appStoreUrl} />
            <StoreButton type="google" url={heroContent.playStoreUrl} />
          </Animated.View>

          <Animated.View style={[styles.stats, statsStyle]}>
            {/* ... stats ... */}
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>10K+</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Users</Text>
            </View>
            {isDesktop && <View style={[styles.statDivider, { backgroundColor: colors.border, display: 'flex' }]} />}
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>360K+</Text>
              <Text style={[styles.statLabel, { color: colors.muted, textAlign: 'center' }]}>Spoonacular Recipes</Text>
            </View>
            {isDesktop && <View style={[styles.statDivider, { backgroundColor: colors.border, display: 'flex' }]} />}
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>Unlimited</Text>
              <Text style={[styles.statLabel, { color: colors.muted, textAlign: 'center' }]}>AI Recipes</Text>
            </View>
            {isDesktop && <View style={[styles.statDivider, { backgroundColor: colors.border, display: 'flex' }]} />}
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>4.9</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Rating</Text>
            </View>
          </Animated.View>
        </View>

        {/* Hero Image/Video */}
        {/* Moved phoneStyle from here to the View inside */}
        <View style={[styles.mediaContainer, isDesktop && styles.mediaContainerDesktop]}>
          <Animated.View style={[styles.phoneFrame, { backgroundColor: '#000000', borderColor: '#121212' }, phoneStyle]}>
            {/* iPhone Notch / Dynamic Island */}
            <View style={styles.notch}>
              <View style={styles.notchCamera} />
            </View>

            {heroContent.heroMediaType === 'video' ? (
              <View style={styles.videoContainer}>
                {Platform.OS === 'web' ? (
                  <iframe
                    src={heroContent.heroVideoUrl}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: 32, // Match frame interior
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowFullScreen
                  />
                ) : (
                  <View style={[styles.placeholder, { backgroundColor: colors.surface }]}>
                    <Text style={{ color: colors.muted }}>Video</Text>
                  </View>
                )}
              </View>
            ) : (
              <Image
                source={typeof heroContent.heroImageUrl === 'string' ? { uri: heroContent.heroImageUrl } : heroContent.heroImageUrl}
                style={styles.heroImage}
                contentFit="fill" // Ensure full coverage
              />
            )}
          </Animated.View>
          
          {/* Decorative elements - Now Animated and independent */}
          <Animated.View style={[styles.decorCircle1, { backgroundColor: colors.primary, opacity: 0.15 }, decor1Style]} />
          <Animated.View style={[styles.decorCircle2, { backgroundColor: colors.secondary, opacity: 0.1 }, decor2Style]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    minHeight: 700,
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: 'column',
    gap: 48,
  },
  containerDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContent: {
    flex: 1,
    alignItems: 'center',
  },
  textContentDesktop: {
    alignItems: 'flex-start',
    maxWidth: 560,
  },
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 24,
    alignSelf: 'center',
  },
  title: {
    fontSize: 52,
    fontWeight: '800',
    lineHeight: 62,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 32,
    textAlign: 'center',
  },
  storeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 40,
    justifyContent: 'center',
    width: '100%',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    flexWrap: 'wrap', // Allow wrapping on mobile
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    minWidth: 80, // Ensure touch target/readability
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    display: 'none', // Hide by default (mobile first approach for simple toggling, or handle in component)
  },
  mediaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mediaContainerDesktop: {
    maxWidth: 400,
  },
  phoneFrame: {
    borderRadius: 50, // Higher radius for modern iphone
    borderWidth: 12, // Thicker bezel
    padding: 0, // No padding, screen goes to edge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 25,
    width: 300,
    height: 600,
    overflow: 'hidden',
    position: 'relative', // Context for notch
  },
  notch: {
    position: 'absolute',
    top: 0, // Attached to top bezel
    alignSelf: 'center',
    width: 120, // Wider for classic notary
    height: 24,
    backgroundColor: '#000',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notchCamera: {
    width: 80,
    height: 80, // Simulation reflection?
    // Actually simpler: just the black pill is usually enough.
  },
  videoContainer: {
    flex: 1,
    borderRadius: 38, // Match frame
    overflow: 'hidden',
    backgroundColor: '#000', // Fill gaps
  },
  heroImage: {
    flex: 1,
    borderRadius: 38, // Match frame interior
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorCircle1: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    top: -80,
    right: -120,
    zIndex: -1,
  },
  decorCircle2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    bottom: -50,
    left: -100,
    zIndex: -1,
  },
});
