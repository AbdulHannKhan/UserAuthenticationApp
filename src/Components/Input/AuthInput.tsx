import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { moderateScale as ms, scale as s, verticalScale as vs } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';

import { Colors, Fonts } from '../../Theme';

type AuthInputProps = TextInputProps & {
  label: string;
  error?: string;
  isPassword?: boolean;
  secureTextEntry?: boolean;
  onToggleSecure?: () => void;
};

function AuthInputComponent({
  label,
  error,
  isPassword = false,
  secureTextEntry,
  onToggleSecure,
  ...props
}: AuthInputProps): React.JSX.Element {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error ? styles.inputError : undefined]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.placeholder}
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {isPassword && onToggleSecure ? (
          <Pressable onPress={onToggleSecure} style={styles.eyeButton} hitSlop={8}>
            <Feather
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={ms(20)}
              color={Colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export const AuthInput = memo(AuthInputComponent);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: vs(14),
  },
  label: {
    fontSize: ms(14),
    color: Colors.textPrimary,
    marginBottom: vs(6),
    fontFamily: Fonts.semiBold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: ms(10),
    backgroundColor: Colors.cardBackground,
  },
  input: {
    flex: 1,
    paddingHorizontal: s(12),
    paddingVertical: vs(11),
    fontSize: ms(15),
    color: Colors.black,
    fontFamily: Fonts.regular,
  },
  eyeButton: {
    paddingHorizontal: s(12),
    paddingVertical: vs(10),
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    marginTop: vs(6),
    color: Colors.error,
    fontSize: ms(12),
    fontFamily: Fonts.regular,
  },
});
