import { FormikProps } from 'formik';

import { AuthContextType } from './auth';
import { LoginFormValues, SignupFormValues } from './forms';

type AuthUser = AuthContextType['user'];

export type LoginControllerViewModel = {
  formik: FormikProps<LoginFormValues>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  goToSignup: () => void;
};

export type SignupControllerViewModel = {
  formik: FormikProps<SignupFormValues>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  goToLogin: () => void;
};

export type HomeControllerViewModel = {
  user: AuthUser;
  isLoggingOut: boolean;
  handleLogout: () => Promise<void>;
};
