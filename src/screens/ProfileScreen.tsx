// src/screens/ProfileScreen.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Surface, Text, Card, useTheme, Avatar, Button, List, IconButton} from 'react-native-paper';

const ProfileScreen = () => {
  const theme = useTheme();

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Image
                size={100}
                source={{ uri: 'https://placekitten.com/200/200' }}
            />
            <View style={styles.profileInfo}>
              <Text variant="headlineSmall">Restaurant Name</Text>
              <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>
                Premium Account
              </Text>
            </View>
            <Button
                mode="contained"
                icon="account-edit"
                style={{ marginTop: 16 }}
            >
              Edit Profile
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.settingsCard}>
          <Card.Content>
            <List.Section>
              <List.Item
                  title="Business Hours"
                  left={props => <List.Icon {...props} icon="clock-outline" />}
                  right={props => <IconButton {...props} icon="chevron-right" />}
              />
              <List.Item
                  title="Notifications"
                  left={props => <List.Icon {...props} icon="bell-outline" />}
                  right={props => <IconButton {...props} icon="chevron-right" />}
              />
              <List.Item
                  title="Payment Methods"
                  left={props => <List.Icon {...props} icon="credit-card" />}
                  right={props => <IconButton {...props} icon="chevron-right" />}
              />
              <List.Item
                  title="Language"
                  left={props => <List.Icon {...props} icon="translate" />}
                  right={props => <IconButton {...props} icon="chevron-right" />}
              />
              <List.Item
                  title="Help & Support"
                  left={props => <List.Icon {...props} icon="help-circle" />}
                  right={props => <IconButton {...props} icon="chevron-right" />}
              />
            </List.Section>
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
  profileCard: {
    marginBottom: 16,
  },
  profileContent: {
    alignItems: 'center',
    padding: 16,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  settingsCard: {
    flex: 1,
  },
});

export default ProfileScreen;