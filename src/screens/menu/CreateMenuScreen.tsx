import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Text,
  Switch,
  KeyboardAvoidingView,
  Platform,
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
import { MenuItem, Menu } from '../../interface/menu';
import { menuService } from '../../services/menu';
import {useGlobalState} from "../reducer/reducers.tsx";

const CreateMenuScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const state = useGlobalState();
  const { menuItems: initialItems } = route.params as { menuItems: MenuItem[] };

  const [menuName, setMenuName] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialItems);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeMenuItem = (
      index: number,
      field: keyof MenuItem,
      value: string | number | boolean
  ) => {
    setMenuItems(prev =>
        prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddMenuItem = () => {
    setMenuItems(prev => [
      ...prev,
      { name: '', description: '', price: 0, active: true },
    ]);
  };

  const handleRemoveMenuItem = (index: number) => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to remove this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setMenuItems(prev => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  const handleSave = async () => {
    if (!menuName.trim()) {
      Alert.alert('Validation Error', 'Menu name is required.');
      return;
    }

    for (const [index, item] of menuItems.entries()) {
      if (!item.name.trim()) {
        Alert.alert('Validation Error', `Item ${index + 1} is missing a name.`);
        return;
      }
      if (isNaN(item.price)) {
        Alert.alert('Validation Error', `Item ${index + 1} has invalid price.`);
        return;
      }
    }

    const newMenu: Menu = {
      name: menuName.trim(),
      menuItems,
      companyId: state.auth.user?.company.id, // Replace with actual company ID if needed
    };

    try {
      setIsSubmitting(true);
      await menuService.insertOrUpdateMenu(newMenu);
      Alert.alert('Success', 'Menu created successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
      navigation.navigate("MenuSettings")
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create menu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <TextInput
                label="Menu Name"
                value={menuName}
                onChangeText={setMenuName}
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

            {menuItems.map((item, index) => (
                <View key={index} style={styles.menuItemContainer}>
                  <View style={styles.headerRow}>
                    <IconButton
                        icon="delete"
                        iconColor="red"
                        onPress={() => handleRemoveMenuItem(index)}
                    />
                  </View>
                  <TextInput
                      label="Item Name"
                      value={item.name}
                      onChangeText={text => onChangeMenuItem(index, 'name', text)}
                      mode="outlined"
                      style={styles.input}
                  />
                  <TextInput
                      label="Description"
                      value={item.description}
                      onChangeText={text => onChangeMenuItem(index, 'description', text)}
                      mode="outlined"
                      multiline
                      style={styles.input}
                  />
                  <TextInput
                      label="Price"
                      value={item.price.toString()}
                      onChangeText={text => {
                        const num = parseFloat(text);
                        onChangeMenuItem(index, 'price', isNaN(num) ? 0 : num);
                      }}
                      mode="outlined"
                      keyboardType="numeric"
                      style={styles.input}
                  />
                  <View style={styles.switchRow}>
                    <Text>Active</Text>
                    <Switch
                        value={item.active}
                        onValueChange={value => onChangeMenuItem(index, 'active', value)}
                    />
                  </View>

                  <Divider style={{ marginVertical: 10 }} />
                </View>
            ))}
          </ScrollView>

          {/* Sticky Save Button */}
          <View style={styles.saveContainer}>
            <Button
                mode="contained"
                onPress={handleSave}
                loading={isSubmitting}
                disabled={isSubmitting}
                style={styles.saveButton}
            >
              Save Menu
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 12,
  },
  menuItemContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  saveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    borderRadius: 8,
  },
});

export default CreateMenuScreen;
