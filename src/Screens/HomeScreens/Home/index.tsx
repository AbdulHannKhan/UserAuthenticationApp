import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale as ms, scale as s, verticalScale as vs } from 'react-native-size-matters';

import { CustomButton } from '../../../Components/Button/CustomButton';
import { UserInfoCard } from '../../../Components/Card/UserInfoCard';
import { Colors, Fonts } from '../../../Theme';
import { useHomeController } from '../../../ViewController/HomeScreens/Home';

export function Home(): React.JSX.Element {
  const { userRows, isLoggingOut, handleLogout } = useHomeController();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitle}>You are logged in successfully.</Text>

      <UserInfoCard rows={userRows} />

      <CustomButton
        title={isLoggingOut ? 'Logging out...' : 'Logout'}
        variant="destructive"
        onPress={handleLogout}
        loading={isLoggingOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
});
