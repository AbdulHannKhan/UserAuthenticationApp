import { FormikErrors } from 'formik';

import { LoginFormValues, SignupFormValues } from '../../Types/forms';

export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
};

export const isValidPassword = (value: string): boolean => value.length >= 6;

export const validateLoginForm = (
  values: LoginFormValues,
): FormikErrors<LoginFormValues> => {
  const errors: FormikErrors<LoginFormValues> = {};

  if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email.';
  }

  if (values.password.trim().length === 0) {
    errors.password = 'Password is required.';
  }

  return errors;
};

export const getLoginValidationMessage = (values: LoginFormValues): string => {
  if (!isValidEmail(values.email) || values.password.trim().length === 0) {
    return 'Please enter a valid email and password.';
  }
  return '';
};

export const validateSignupForm = (
  values: SignupFormValues,
): FormikErrors<SignupFormValues> => {
  const errors: FormikErrors<SignupFormValues> = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email.';
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required.';
  } else if (!isValidPassword(values.password)) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
};

export const getSignupValidationMessage = (values: SignupFormValues): string => {
  if (!values.name.trim() || !values.email.trim() || !values.password.trim()) {
    return 'Please fill all fields.';
  }

  if (!isValidEmail(values.email)) {
    return 'Please enter a valid email format.';
  }

  if (!isValidPassword(values.password)) {
    return 'Password must be at least 6 characters.';
  }

  return '';
};
