import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale as ms, scale as s, verticalScale as vs } from 'react-native-size-matters';

import { Colors, Fonts } from '../../Theme';
import { InfoRow } from '../../Types/controllers';

type UserInfoCardProps = {
  rows: InfoRow[];
};

function UserInfoCardComponent({ rows }: UserInfoCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      {rows.map((row, index) => (
        <View key={row.label} style={index > 0 && styles.rowSpacing}>
          <Text style={styles.label}>{row.label}</Text>
          <Text style={styles.value}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

export const UserInfoCard = memo(UserInfoCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: ms(12),
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: s(16),
    marginBottom: vs(24),
  },
  rowSpacing: {
    marginTop: vs(8),
  },
  label: {
    fontSize: ms(13),
    color: Colors.textMuted,
    marginBottom: vs(6),
    fontFamily: Fonts.regular,
  },
  value: {
    fontSize: ms(16),
    color: Colors.textPrimary,
    fontFamily: Fonts.semiBold,
  },
});
