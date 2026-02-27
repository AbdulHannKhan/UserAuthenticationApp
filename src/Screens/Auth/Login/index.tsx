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
import { useLoginController } from '../../../ViewController/Auth/Login';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function Login({ navigation }: Props): React.JSX.Element {
  const { formik, showPassword, togglePasswordVisibility, goToSignup } =
    useLoginController({ navigation });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

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
          placeholder="Enter password"
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
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={goToSignup}>
          <Text style={styles.secondaryButtonText}>Go to Signup</Text>
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
    marginTop: vs(6),
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
