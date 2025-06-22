import React, {useCallback, useEffect, useState} from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, IconButton, List, Searchbar, Surface, useTheme } from 'react-native-paper';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Menu} from "../../interface/menu.ts";
import {menuService} from "../../services/menu.ts";

const MenuSettingsScreen = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Searchbar
              placeholder="Search menus..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchbar}
          />
          <Button onPress={() => navigation.navigate('AddMenu')} mode="contained">
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
                        <IconButton
                            icon="pencil"
                            onPress={() => navigation.navigate('EditMenu', { menu: item })}
                        />
                    )}
                />
            )}
        />
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
