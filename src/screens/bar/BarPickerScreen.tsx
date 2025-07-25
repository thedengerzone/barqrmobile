import React, {useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet,} from 'react-native';
import {Button, List, Surface, Text, TextInput, useTheme,} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BarDto} from '../../interface/bar.ts';
import {barService} from '../../services/bar.ts';
import {useGlobalDispatch, useGlobalState} from "../reducer/reducers.tsx";

const BarPickerScreen = ({navigation}) => {
  const [bars, setBars] = useState<BarDto[]>([]);
  const [selectedBar, setSelectedBar] = useState<BarDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const state = useGlobalState()
  const dispatch = useGlobalDispatch()

  useEffect(() => {
    async function fetchBars() {
      try {
        const company = state.auth.user?.company;
        if (company && company.id != null) {
          const data: BarDto[] = await barService.getBarsByCompany(company.id);
          setBars(data);
        } else {
          setBars([]);
        }
      } catch (err) {
        console.error('Error fetching bars', err);
        setBars([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBars();
  }, []);

  const handleContinue = () => {
    if (selectedBar) {
      dispatch({type: "setBar", payload: selectedBar})
      navigation.navigate('Home');
    }
  };

  const filteredBars = bars.filter((bar) =>
      bar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bar.address || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
            style={styles.keyboardAvoiding}
        >
          <Surface style={styles.surface}>
            <Text variant="headlineMedium" style={styles.title}>
              Select a Bar
            </Text>

            <TextInput
                label="Search bars"
                value={searchQuery}
                onChangeText={setSearchQuery}
                mode="outlined"
                style={styles.searchInput}
                placeholder="Type a bar name or address"
            />

            {loading ? (
                <Text>Loading bars...</Text>
            ) : (
                <FlatList
                    data={filteredBars}
                    keyExtractor={(item) => item.id.toString()}
                    style={{flexGrow: 0}}
                    contentContainerStyle={{paddingBottom: 20}}
                    renderItem={({item}) => (
                        <List.Item
                            title={item.name}
                            description={item.address || ''}
                            onPress={() => setSelectedBar(item)}
                            style={[
                              styles.barItem,
                              selectedBar?.id === item.id && {
                                backgroundColor: theme.colors.primaryContainer,
                              },
                            ]}
                        />
                    )}
                />
            )}

            <Button
                mode="contained"
                disabled={!selectedBar}
                onPress={handleContinue}
                style={styles.button}
            >
              Continue
            </Button>
          </Surface>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  surface: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  searchInput: {
    marginBottom: 16,
  },
  barItem: {
    marginBottom: 8,
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 6,
  },
});

export default BarPickerScreen;
