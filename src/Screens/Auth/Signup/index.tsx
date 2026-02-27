import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { moderateScale as ms, scale as s, verticalScale as vs } from 'react-native-size-matters';

import { AuthInput } from '../../../Components/Input/AuthInput';
import { AuthStackParamList } from '../../../Navigation/AuthStack';
import { Colors, Fonts } from '../../../Theme';
import { useSignupController } from '../../../ViewController/Auth/Signup';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export function Signup({ navigation }: Props): React.JSX.Element {
  const { formik, showPassword, togglePasswordVisibility, goToLogin } =
    useSignupController({ navigation });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
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

        <Pressable
          style={[styles.primaryButton, formik.isSubmitting ? styles.buttonDisabled : undefined]}
          onPress={formik.submitForm}
          disabled={formik.isSubmitting}
        >
          <Text style={styles.primaryButtonText}>
            {formik.isSubmitting ? 'Signing up...' : 'Signup'}
          </Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={goToLogin}>
          <Text style={styles.secondaryButtonText}>Go to Login</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: s(20),
    paddingVertical: vs(24),
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
    fontFamily: Fonts.regular,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: ms(10),
    paddingVertical: vs(13),
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: ms(16),
    fontFamily: Fonts.bold,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  secondaryButton: {
    marginTop: vs(14),
    alignItems: 'center',
    paddingVertical: vs(8),
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: ms(14),
    fontFamily: Fonts.semiBold,
  },
});
