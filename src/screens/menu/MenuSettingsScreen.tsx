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

const MenuSettingsScreen = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuToDelete, setMenuToDelete] = useState<Menu | null>(null);
  const navigation = useNavigation();
  const theme = useTheme();

  useFocusEffect(
      useCallback(() => {
        const fetchMenus = async () => {
          const response = await menuService.getAll();
          setMenus(response);
        };

        fetchMenus();
      }, [])
  );

  const filteredMenus = menus.filter(menu =>
      menu.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDeleteMenu = async () => {
    if (menuToDelete) {
      await menuService.deleteMenu(menuToDelete.id);
      setMenus(prev => prev.filter(menu => menu.id !== menuToDelete.id));
      setMenuToDelete(null);
    }
  };

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Searchbar
              placeholder="Search menus..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchbar}
          />
          <Button onPress={() => navigation.navigate('Camera')} mode="contained">
            Add
          </Button>
        </View>

        <FlatList
            data={filteredMenus}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <List.Item
                    title={item.name}
                    right={() => (
                        <>
                          <IconButton
                              icon="pencil"
                              onPress={() => navigation.navigate('EditMenu', {menu: item})}
                          />
                          <IconButton
                              icon="delete"
                              onPress={() => setMenuToDelete(item)}
                          />
                        </>
                    )}
                />
            )}
        />

        {/* Delete Confirmation Dialog */}
        <Portal>
          <Dialog visible={menuToDelete !== null} onDismiss={() => setMenuToDelete(null)}>
            <Dialog.Title>Confirm Delete</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure you want to delete "{menuToDelete?.name}"?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setMenuToDelete(null)}>Cancel</Button>
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

export default MenuSettingsScreen;
