import React, {useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet,} from 'react-native';
import {Button, List, Surface, Text, useTheme} from 'react-native-paper';
import {BarDto} from '../interface/bar'; // You’ll need to define this
import {useRoute} from '@react-navigation/native';
import {barService} from "../services/bar.ts";

const BarPickerScreen = ({navigation}) => {
  const [bars, setBars] = useState<BarDto[]>([]);
  const [selectedBar, setSelectedBar] = useState<BarDto | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const route = useRoute();
  const {companyId} = route.params;

  useEffect(() => {
    async function fetchBars() {
      try {
        const data: BarDto[] = await barService.getBarsByCompany(companyId);
        setBars(data);
      } catch (err) {
        console.error('Error fetching bars', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBars();
  }, [companyId]);

  const handleContinue = () => {
    if (selectedBar) {
      navigation.navigate('Home', {barId: selectedBar.id});
    }
  };

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
      >
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>
            Select a Bar
          </Text>

          {loading ? (
              <Text>Loading bars...</Text>
          ) : (
              <FlatList
                  data={bars}
                  keyExtractor={(item) => item.id.toString()}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  surface: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
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
