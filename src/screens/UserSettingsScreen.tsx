import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, IconButton, List, Searchbar, Surface, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {SafeAreaView} from "react-native-safe-area-context";

const mockUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const UserSettingsScreen = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      // Replace with actual API
      setUsers(mockUsers);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <SafeAreaView>
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
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <List.Item
                    title={item.name}
                    right={() => (
                        <IconButton
                            icon="pencil"
                            onPress={() => navigation.navigate('EditUser', { id: item.id })}
                        />
                    )}
                />
            )}
        />
      </Surface>
      </SafeAreaView>
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
