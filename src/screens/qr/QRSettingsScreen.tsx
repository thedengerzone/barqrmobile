import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Surface, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const QrSettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <List.Section>
          <List.Subheader>QR Settings</List.Subheader>

          <List.Item
              title="Create QR code"
              description="Create new QR codes and assign them to a bar"
              left={(props) => <List.Icon {...props} icon="qrcode" />}
              onPress={() => navigation.navigate('AddQRCode')}
          />

          <List.Item
              title="Edit QR code"
              description="Edit table numbers, change bars, remove QRs"
              left={(props) => <List.Icon {...props} icon="qrcode-edit" />}
              onPress={() => navigation.navigate('ManageQRCode')}
          />
        </List.Section>
      </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
});

export default QrSettingsScreen;
