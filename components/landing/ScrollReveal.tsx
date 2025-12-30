import React, { useEffect, useRef } from 'react';
import { Platform, View, ViewProps } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated';

interface ScrollRevealProps extends ViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  translateY?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 600,
  translateY = 40,
  threshold = 0.1,
  style,
  ...props
}: ScrollRevealProps) {
  const opacity = useSharedValue(0);
  const translate = useSharedValue(translateY);
  const hasAnimated = useRef(false);
  const viewRef = useRef<View>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // On non-web platforms, just animate immediately
      opacity.value = withDelay(delay, withTiming(1, { duration, easing: Easing.out(Easing.cubic) }));
      translate.value = withDelay(delay, withTiming(0, { duration, easing: Easing.out(Easing.cubic) }));
      return;
    }

    // Web: Use Intersection Observer for scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            opacity.value = withDelay(delay, withTiming(1, { duration, easing: Easing.out(Easing.cubic) }));
            translate.value = withDelay(delay, withTiming(0, { duration, easing: Easing.out(Easing.cubic) }));
          }
        });
      },
      { threshold }
    );

    // Need to wait for the ref to be available
    const timer = setTimeout(() => {
      if (viewRef.current) {
        const element = viewRef.current as unknown as Element;
        if (element && 'nodeType' in element) {
          observer.observe(element);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [delay, duration, threshold]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translate.value }],
  }));

  return (
    <Animated.View
      ref={viewRef}
      style={[animatedStyle, style]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

// Staggered reveal for multiple items
interface StaggeredRevealProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  translateY?: number;
}

export function StaggeredReveal({
  children,
  staggerDelay = 100,
  baseDelay = 0,
  duration = 600,
  translateY = 40,
}: StaggeredRevealProps) {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <ScrollReveal
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          translateY={translateY}
        >
          {child}
        </ScrollReveal>
      ))}
    </>
  );
}
