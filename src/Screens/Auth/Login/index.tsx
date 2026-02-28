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
import { useLoginController } from '../../../ViewController/Auth/Login';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function Login({ navigation }: Props): React.JSX.Element {
  const { formik, showPassword, togglePasswordVisibility, goToSignup } =
    useLoginController({ navigation });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
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

        <CustomButton
          title={formik.isSubmitting ? 'Logging in...' : 'Login'}
          onPress={formik.submitForm}
          loading={formik.isSubmitting}
          style={styles.loginButton}
        />

        <CustomButton
          title="Go to Signup"
          variant="secondary"
          onPress={goToSignup}
          style={styles.signupLink}
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
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: Colors.white,
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
    fontFamily: Fonts.medium,
  },
  loginButton: {
    marginTop: vs(6),
  },
  signupLink: {
    marginTop: vs(14),
  },
});
