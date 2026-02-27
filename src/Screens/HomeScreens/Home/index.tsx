import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { moderateScale as ms, scale as s, verticalScale as vs } from 'react-native-size-matters';

import { Colors, Fonts } from '../../../Theme';
import { useHomeController } from '../../../ViewController/HomeScreens/Home';

export function Home(): React.JSX.Element {
  const { user, isLoggingOut, handleLogout } = useHomeController();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitle}>You are logged in successfully.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name ?? '-'}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email ?? '-'}</Text>
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={isLoggingOut}
      >
        <Text style={styles.logoutText}>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: s(20),
    justifyContent: 'center',
  },
  title: {
    fontSize: ms(28),
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: vs(8),
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginBottom: vs(28),
    fontSize: ms(15),
    fontFamily: Fonts.regular,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: ms(12),
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: s(16),
    marginBottom: vs(24),
  },
  label: {
    fontSize: ms(13),
    color: Colors.textMuted,
    marginBottom: vs(6),
    marginTop: vs(8),
    fontFamily: Fonts.regular,
  },
  value: {
    fontSize: ms(16),
    color: Colors.textPrimary,
    fontFamily: Fonts.semiBold,
  },
  logoutButton: {
    backgroundColor: Colors.error,
    borderRadius: ms(10),
    paddingVertical: vs(13),
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.white,
    fontSize: ms(16),
    fontFamily: Fonts.bold,
  },
});
