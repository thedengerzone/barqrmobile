import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, IconButton, List, Searchbar, Surface, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {BarDto} from "../../interface/bar.ts";
import {barService} from "../../services/bar.ts";
import {useGlobalState} from "../reducer/reducers.tsx";

const BarSettingsScreen = () => {
  const [bars, setBars] = useState<BarDto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const theme = useTheme();
  const state = useGlobalState()

  useEffect(() => {
    const fetchBars = async () => {
      const response = await barService.getBarsByCompany(state.auth.user?.company.id)
      if (response) {
        setBars(response);
      }
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
          <Button onPress={() => navigation.navigate('NewBar', { companyId: state.auth.user?.company.id })} mode="contained">
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
