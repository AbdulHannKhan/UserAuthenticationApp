import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import Toast from 'react-native-toast-message';

import { useAuth } from '../../../Context/AuthContext';
import { loginInitialValues } from '../../../Formik/InitialValues';
import { getLoginValidationMessage, validateLoginForm } from '../../../Formik/Validations';
import { AuthStackParamList } from '../../../Navigation/AuthStack';
import { LoginControllerViewModel } from '../../../Types/controllers';
import { LoginFormValues } from '../../../Types/forms';

type LoginNavigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

type LoginControllerParams = {
  navigation: LoginNavigation;
};

export function useLoginController({
  navigation,
}: LoginControllerParams): LoginControllerViewModel {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: loginInitialValues,
    validate: validateLoginForm,
    onSubmit: async (values, helpers) => {
      const validationMessage = getLoginValidationMessage(values);
      if (validationMessage) {
        Toast.show({ type: 'error', text1: 'Login Failed', text2: validationMessage });
        helpers.setSubmitting(false);
        return;
      }

      try {
        await login(values.email, values.password);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Invalid credentials.';
        Toast.show({ type: 'error', text1: 'Login Failed', text2: message });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = useCallback((): void => {
    setShowPassword(prev => !prev);
  }, []);

  const goToSignup = useCallback((): void => {
    navigation.navigate('Signup');
  }, [navigation]);

  return {
    formik,
    showPassword,
    togglePasswordVisibility,
    goToSignup,
  };
}
