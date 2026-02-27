import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale as ms, scale as s, verticalScale as vs } from 'react-native-size-matters';
import { BaseToastProps } from 'react-native-toast-message';

import { Colors, Fonts } from '../Theme';

function ErrorToast({ text1, text2 }: BaseToastProps) {
  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorAccent} />
      <View style={styles.iconWrapper}>
        <View style={styles.errorIconCircle}>
          <Text style={styles.iconText}>!</Text>
        </View>
      </View>
      <View style={styles.textWrapper}>
        {text1 ? <Text style={styles.errorTitle}>{text1}</Text> : null}
        {text2 ? <Text style={styles.errorMessage}>{text2}</Text> : null}
      </View>
    </View>
  );
}

function SuccessToast({ text1, text2 }: BaseToastProps) {
  return (
    <View style={styles.successContainer}>
      <View style={styles.successAccent} />
      <View style={styles.iconWrapper}>
        <View style={styles.successIconCircle}>
          <Text style={styles.iconText}>✓</Text>
        </View>
      </View>
      <View style={styles.textWrapper}>
        {text1 ? <Text style={styles.successTitle}>{text1}</Text> : null}
        {text2 ? <Text style={styles.successMessage}>{text2}</Text> : null}
      </View>
    </View>
  );
}

export const toastConfig = {
  error: (props: BaseToastProps) => <ErrorToast {...props} />,
  success: (props: BaseToastProps) => <SuccessToast {...props} />,
};

const BASE_CONTAINER = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  width: '92%' as const,
  borderRadius: ms(16),
  paddingVertical: vs(10),
  paddingRight: s(18),
  shadowOffset: { width: 0, height: vs(4) },
  shadowOpacity: 0.18,
  shadowRadius: ms(14),
  elevation: 10,
  overflow: 'hidden' as const,
};

const BASE_ACCENT = {
  width: s(5),
  borderTopLeftRadius: ms(16),
  borderBottomLeftRadius: ms(16),
  position: 'absolute' as const,
  left: 0,
  top: 0,
  bottom: 0,
};

const styles = StyleSheet.create({
  errorContainer: {
    ...BASE_CONTAINER,
    backgroundColor: Colors.errorLight,
    shadowColor: Colors.error,
  },
  successContainer: {
    ...BASE_CONTAINER,
    backgroundColor: Colors.successLight,
    shadowColor: Colors.success,
  },
  errorAccent: {
    ...BASE_ACCENT,
    backgroundColor: Colors.error,
  },
  successAccent: {
    ...BASE_ACCENT,
    backgroundColor: Colors.success,
  },
  iconWrapper: {
    marginLeft: s(18),
    marginRight: s(14),
  },
  errorIconCircle: {
    width: ms(36),
    height: ms(36),
    borderRadius: ms(18),
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconCircle: {
    width: ms(36),
    height: ms(36),
    borderRadius: ms(18),
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: Colors.white,
    fontSize: ms(18),
    fontFamily: Fonts.extraBold,
  },
  textWrapper: {
    flex: 1,
  },
  errorTitle: {
    fontSize: ms(15),
    fontFamily: Fonts.bold,
    color: Colors.errorTitle,
    marginBottom: vs(3),
  },
  errorMessage: {
    fontSize: ms(13),
    color: Colors.errorMessage,
    fontFamily: Fonts.medium,
    lineHeight: vs(18),
  },
  successTitle: {
    fontSize: ms(15),
    fontFamily: Fonts.bold,
    color: Colors.successTitle,
    marginBottom: vs(3),
  },
  successMessage: {
    fontSize: ms(13),
    color: Colors.successMessage,
    fontFamily: Fonts.medium,
    lineHeight: vs(18),
  },
});
