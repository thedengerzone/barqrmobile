import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Button,
  Dialog,
  IconButton,
  List,
  Paragraph,
  Portal,
  Searchbar,
  Surface,
  useTheme
} from 'react-native-paper';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Menu} from "../../interface/menu.ts";
import {menuService} from "../../services/menu.ts";
import {userService} from "../../services/user.ts";
import {User} from "../../interface/user.ts";

const UserSettingsScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const navigation = useNavigation();
  const theme = useTheme();

  useFocusEffect(
      useCallback(() => {
        const fetchUsers = async () => {
          const response = await userService.getUsers();
          setUsers(response);
        };

        fetchUsers();
      }, [])
  );

  const filteredMenus = users.filter(menu =>
      menu.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDeleteMenu = async () => {
    if (userToDelete) {
      await userService.deleteUser(userToDelete.id);
      setUsers(prev => prev.filter(menu => menu.id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Searchbar
              placeholder="Search users..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchbar}
          />
          <Button onPress={() => navigation.navigate('AddUser')} mode="contained">
            Add
          </Button>
        </View>

        <FlatList
            data={filteredMenus}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <List.Item
                    title={item.username}
                    right={() => (
                        <>
                          <IconButton
                              icon="delete"
                              onPress={() => setUserToDelete(item)}
                          />
                        </>
                    )}
                />
            )}
        />

        {/* Delete Confirmation Dialog */}
        <Portal>
          <Dialog visible={userToDelete !== null} onDismiss={() => setUserToDelete(null)}>
            <Dialog.Title>Confirm Delete</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure you want to delete "{userToDelete?.username}"?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setUserToDelete(null)}>Cancel</Button>
              <Button onPress={confirmDeleteMenu}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  searchbar: {
    flex: 1,
    marginRight: 8,
  },
});

export default UserSettingsScreen;
