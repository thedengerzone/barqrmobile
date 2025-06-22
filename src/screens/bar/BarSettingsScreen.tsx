import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, IconButton, List, Searchbar, Surface, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const mockBars = [
  { id: 1, name: 'Main Street Bar' },
  { id: 2, name: 'Downtown Lounge' },
];

const BarSettingsScreen = () => {
  const [bars, setBars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    const fetchBars = async () => {
      // Replace with actual API
      setBars(mockBars);
    };
    fetchBars();
  }, []);

  const filteredBars = bars.filter(bar =>
      bar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Searchbar
              placeholder="Search bars..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchbar}
          />
          <Button onPress={() => navigation.navigate('AddBar')} mode="contained">
            Add
          </Button>
        </View>

        <FlatList
            data={filteredBars}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <List.Item
                    title={item.name}
                    right={() => (
                        <IconButton
                            icon="pencil"
                            onPress={() => navigation.navigate('EditBar', { id: item.id })}
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

export default BarSettingsScreen;
