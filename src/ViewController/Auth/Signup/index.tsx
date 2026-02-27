import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import Toast from 'react-native-toast-message';

import { useAuth } from '../../../Context/AuthContext';
import { signupInitialValues } from '../../../Formik/InitialValues';
import { getSignupValidationMessage, validateSignupForm } from '../../../Formik/Validations';
import { AuthStackParamList } from '../../../Navigation/AuthStack';
import { SignupControllerViewModel } from '../../../Types/controllers';
import { SignupFormValues } from '../../../Types/forms';

type SignupNavigation = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

type SignupControllerParams = {
  navigation: SignupNavigation;
};

export function useSignupController({
  navigation,
}: SignupControllerParams): SignupControllerViewModel {
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formik = useFormik<SignupFormValues>({
    initialValues: signupInitialValues,
    validate: validateSignupForm,
    onSubmit: async (values, helpers) => {
      const validationMessage = getSignupValidationMessage(values);
      if (validationMessage) {
        Toast.show({ type: 'error', text1: 'Signup Failed', text2: validationMessage });
        helpers.setSubmitting(false);
        return;
      }

      try {
        await signup(values.name, values.email, values.password);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Signup failed.';
        Toast.show({ type: 'error', text1: 'Signup Failed', text2: message });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = useCallback((): void => {
    setShowPassword(prev => !prev);
  }, []);

  const goToLogin = useCallback((): void => {
    navigation.navigate('Login');
  }, [navigation]);

  return {
    formik,
    showPassword,
    togglePasswordVisibility,
    goToLogin,
  };
}
