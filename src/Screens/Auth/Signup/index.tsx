import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { moderateScale as ms, scale as s, verticalScale as vs } from 'react-native-size-matters';

import { CustomButton } from '../../../Components/Button/CustomButton';
import { AuthInput } from '../../../Components/Input/AuthInput';
import { AuthStackParamList } from '../../../Navigation/AuthStack';
import { Colors, Fonts } from '../../../Theme';
import { useSignupController } from '../../../ViewController/Auth/Signup';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export function Signup({ navigation }: Props): React.JSX.Element {
  const { formik, showPassword, togglePasswordVisibility, goToLogin } =
    useSignupController({ navigation });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Signup to get started</Text>

        <AuthInput
          label="Name"
          placeholder="Your full name"
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          error={formik.touched.name ? formik.errors.name : undefined}
        />
        <AuthInput
          label="Email"
          placeholder="yourname@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          error={formik.touched.email ? formik.errors.email : undefined}
        />
        <AuthInput
          label="Password"
          placeholder="At least 6 characters"
          isPassword
          secureTextEntry={!showPassword}
          onToggleSecure={togglePasswordVisibility}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          error={formik.touched.password ? formik.errors.password : undefined}
        />

        <CustomButton
          title={formik.isSubmitting ? 'Signing up...' : 'Signup'}
          onPress={formik.submitForm}
          loading={formik.isSubmitting}
        />

        <CustomButton
          title="Go to Login"
          variant="secondary"
          onPress={goToLogin}
          style={styles.loginLink}
        />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: s(20),
    paddingVertical: vs(24),
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: ms(28),
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: vs(8),
  },
  subtitle: {
    color: Colors.textSecondary,
    marginBottom: vs(24),
    fontSize: ms(15),
    fontFamily: Fonts.medium,
  },
  loginLink: {
    marginTop: vs(14),
  },
});
