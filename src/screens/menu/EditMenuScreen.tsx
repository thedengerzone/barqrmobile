import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Text,
  Switch,
} from 'react-native';
import {
  TextInput,
  Button,
  Surface,
  useTheme,
  Divider,
  IconButton,
} from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Menu, MenuItem } from '../../interface/menu';
import { menuService } from '../../services/menu';

const EditMenuScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { menu: initialMenu } = route.params as { menu: Menu };

  const [menu, setMenu] = useState<Menu>(initialMenu);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeMenuName = (name: string) => {
    setMenu(prev => ({ ...prev, name }));
  };

  const onChangeMenuItem = (
      id: number | null,
      field: keyof MenuItem,
      value: string | number | boolean
  ) => {
    setMenu(prev => ({
      ...prev,
      menuItems: prev.menuItems.map(item =>
          item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddMenuItem = () => {
    const newItem: MenuItem = {
      name: '',
      description: '',
      price: 0,
      active: true,
    };

    setMenu(prev => ({
      ...prev,
      menuItems: [...prev.menuItems, newItem],
    }));
  };

  const handleRemoveMenuItem = (id: number | null) => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to remove this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setMenu(prev => ({
            ...prev,
            menuItems: prev.menuItems.filter(item => item.id !== id),
          }));
        },
      },
    ]);
  };

  const handleSave = async () => {
    if (!menu.name.trim()) {
      Alert.alert('Validation Error', 'Menu name is required.');
      return;
    }

    for (const item of menu.menuItems) {
      if (!item.name.trim()) {
        Alert.alert(
            'Validation Error',
            `Menu item name is required (item id: ${item.id ?? 'new'}).`
        );
        return;
      }
      if (item.price == null || isNaN(item.price)) {
        Alert.alert(
            'Validation Error',
            `Valid price is required for menu item (item id: ${item.id ?? 'new'}).`
        );
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await menuService.updateMenu(menu);
      Alert.alert('Success', 'Menu updated successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update menu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView>
          <TextInput
              label="Menu Name"
              value={menu.name}
              onChangeText={onChangeMenuName}
              mode="outlined"
              style={styles.input}
          />

          <Divider style={{ marginVertical: 10 }} />

          <Button
              icon="plus"
              mode="outlined"
              onPress={handleAddMenuItem}
              style={{ marginBottom: 16 }}
          >
            Add Menu Item
          </Button>

          {menu.menuItems.map((item, index) => (
              <View key={item.id ?? `new-${index}`} style={styles.menuItemContainer}>
                <View style={styles.headerRow}>
                  <IconButton
                      icon="delete"
                      iconColor="red"
                      onPress={() => handleRemoveMenuItem(item.id)}
                  />
                </View>
                <TextInput
                    label="Item Name"
                    value={item.name}
                    onChangeText={text => onChangeMenuItem(item.id, 'name', text)}
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput
                    label="Description"
                    value={item.description}
                    onChangeText={text => onChangeMenuItem(item.id, 'description', text)}
                    mode="outlined"
                    multiline
                    style={styles.input}
                />
                <TextInput
                    label="Price"
                    value={item.price.toString()}
                    onChangeText={text => {
                      const num = parseFloat(text);
                      onChangeMenuItem(item.id, 'price', isNaN(num) ? 0 : num);
                    }}
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <View style={styles.switchRow}>
                  <Text>Active</Text>
                  <Switch
                      value={item.active}
                      onValueChange={value => onChangeMenuItem(item.id, 'active', value)}
                  />
                </View>

                <Divider style={{ marginVertical: 10 }} />
              </View>
          ))}

          <Button
              mode="contained"
              onPress={handleSave}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={{ marginTop: 20 }}
          >
            Save All Changes
          </Button>
        </ScrollView>
      </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  menuItemContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditMenuScreen;
