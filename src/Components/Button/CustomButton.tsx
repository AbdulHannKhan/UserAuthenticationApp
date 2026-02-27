import React, { memo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { moderateScale as ms, verticalScale as vs } from 'react-native-size-matters';

import { Colors, Fonts } from '../../Theme';

type ButtonVariant = 'primary' | 'secondary' | 'destructive';

type CustomButtonProps = Omit<PressableProps, 'style'> & {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const variantStyles = {
  primary: {
    container: {
      backgroundColor: Colors.primary,
    },
    text: {
      color: Colors.white,
    },
  },
  secondary: {
    container: {
      backgroundColor: 'transparent',
    },
    text: {
      color: Colors.primary,
    },
  },
  destructive: {
    container: {
      backgroundColor: Colors.error,
    },
    text: {
      color: Colors.white,
    },
  },
} as const;

function CustomButtonComponent({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}: CustomButtonProps): React.JSX.Element {
  const isDisabled = disabled || loading;
  const colors = variantStyles[variant];

  return (
    <Pressable
      style={[
        styles.base,
        colors.container,
        variant === 'secondary' && styles.secondarySpacing,
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={colors.text.color} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            colors.text,
            variant === 'secondary' && styles.secondaryText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

export const CustomButton = memo(CustomButtonComponent);

const styles = StyleSheet.create({
  base: {
    borderRadius: ms(10),
    paddingVertical: vs(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: ms(16),
    fontFamily: Fonts.bold,
  },
  secondarySpacing: {
    paddingVertical: vs(8),
  },
  secondaryText: {
    fontSize: ms(14),
    fontFamily: Fonts.semiBold,
  },
  disabled: {
    opacity: 0.65,
  },
});
