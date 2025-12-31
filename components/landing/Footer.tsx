import { footerContent, siteInfo } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image as ExpoImage } from 'expo-image';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export function Footer() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const scrollToTop = () => {
    if (Platform.OS === 'web') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <View style={[styles.footer, { backgroundColor: colors.surfaceAlt, borderTopColor: colors.border }]}>
      <View style={styles.container}>
        {/* Logo & Tagline */}
        <View style={styles.logoSection}>
          <Pressable onPress={scrollToTop}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
              <ExpoImage 
                source={siteInfo.logo} 
                style={{ width: 40, height: 40, borderRadius: 10 }} 
                contentFit="contain"
              />
              <Text style={[styles.logo, { color: colors.primary, marginBottom: 0 }]}>
                {siteInfo.name}
              </Text>
            </View>
          </Pressable>
          <Text style={[styles.tagline, { color: colors.muted }]}>
            {footerContent.tagline}
          </Text>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={[styles.copyright, { color: colors.muted }]}>
            {footerContent.copyright}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderTopWidth: 1,
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 15,
  },
  divider: {
    width: 60,
    height: 2,
    borderRadius: 1,
    marginVertical: 24,
  },
  copyrightSection: {
    alignItems: 'center',
  },
  copyright: {
    fontSize: 14,
    marginBottom: 8,
  },
  madeWith: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  madeWithText: {
    fontSize: 13,
  },
});
