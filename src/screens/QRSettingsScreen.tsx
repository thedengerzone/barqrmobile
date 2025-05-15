// src/screens/QRSettingsScreen.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Card, useTheme, Button, IconButton, List } from 'react-native-paper';

const QRSettingsScreen = () => {
  const theme = useTheme();

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Card style={styles.qrCard}>
          <Card.Content style={styles.qrContent}>
            <IconButton
                icon="qrcode"
                size={120}
                iconColor={theme.colors.primary}
            />
            <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
              Your Restaurant QR Code
            </Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button icon="share-variant" mode="contained">
              Share
            </Button>
            <Button icon="download" mode="contained-tonal">
              Download
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.settingsCard}>
          <Card.Content>
            <List.Item
                title="Table Count"
                description="Configure number of tables"
                left={props => <List.Icon {...props} icon="table-furniture" />}
                right={props => <IconButton {...props} icon="chevron-right" />}
            />
            <List.Item
                title="Menu Categories"
                description="Manage menu sections"
                left={props => <List.Icon {...props} icon="food-fork-drink" />}
                right={props => <IconButton {...props} icon="chevron-right" />}
            />
            <List.Item
                title="QR Design"
                description="Customize QR code appearance"
                left={props => <List.Icon {...props} icon="palette" />}
                right={props => <IconButton {...props} icon="chevron-right" />}
            />
          </Card.Content>
        </Card>
      </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  qrCard: {
    marginBottom: 16,
  },
  qrContent: {
    alignItems: 'center',
    padding: 16,
  },
  cardActions: {
    justifyContent: 'space-around',
    paddingBottom: 16,
  },
  settingsCard: {
    flex: 1,
  },
});

export default QRSettingsScreen;