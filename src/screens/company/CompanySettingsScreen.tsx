import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Surface, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CompanySettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <List.Section>
          <List.Subheader>Company Settings</List.Subheader>

          <List.Item
              title="Menu Settings"
              description="Create new, edit or update existing menus"
              left={(props) => <List.Icon {...props} icon="food" />}
              onPress={() => navigation.navigate('MenuSettings')}
          />

          <List.Item
              title="Users Settings"
              description="Manage staff and permissions"
              left={(props) => <List.Icon {...props} icon="account-multiple" />}
              onPress={() => navigation.navigate('UserSettings')}
          />

          <List.Item
              title="Bar Settings"
              description="Edit bar info and preferences"
              left={(props) => <List.Icon {...props} icon="store" />}
              onPress={() => navigation.navigate('BarSettings')}
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

export default CompanySettingsScreen;
