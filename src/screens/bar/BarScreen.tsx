// src/screens/BarScreen.tsx
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  HelperText,
  List,
  Surface,
  Text,
  TextInput
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BarDto} from '../../interface/bar.ts';
import {barService} from '../../services/bar.ts';
import {
  AutocompleteResponse,
  Location,
  PlaceDetailsResponse,
  Prediction
} from "../../interface/places.ts";
import {placesService} from "../../services/places.ts";
import {useGlobalDispatch} from "../reducer/reducers.tsx";

const BarScreen = () => {
  const navigation = useNavigation();
  const dispatch = useGlobalDispatch()
  const route = useRoute();
  const companyId = route.params?.companyId;

  const [bar, setBar] = useState<BarDto>({
    name: '',
    description: '',
    companyId: companyId,
    address: '',
    geoLocation: {
      latitude: undefined,
      longitude: undefined,
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    address: '',
  });

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        setLoading(true);
        try {
          const response: AutocompleteResponse = await placesService.searchPlaces(searchQuery);
          setPredictions(response.predictions);
        } catch (error) {
          console.error('Error fetching predictions:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setPredictions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handlePlaceSelect = async (place_id: string) => {
    try {
      setLoading(true);
      const response: PlaceDetailsResponse = await placesService.searchPlaceDetails(place_id);
      const details = response.result;
      const location: Location = details.geometry.location;

      setBar(prev => ({
        ...prev,
        address: details.formatted_address,
        geoLocation: {
          latitude: location.lat,
          longitude: location.lng,
        }
      }));

      setSearchQuery(details.formatted_address);
      setPredictions([]);
    } catch (error) {
      console.error('Error fetching place details:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      description: '',
      address: '',
    };
    let isValid = true;

    if (!bar.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!bar.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!bar.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await barService.upsert(bar);
        if (response) {
          dispatch({type: "setBar", payload: response})
          navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Error creating bar:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Surface style={styles.surface}>
            <Text variant="headlineMedium" style={styles.title}>Create New Bar</Text>

            <TextInput
                label="Bar Name"
                value={bar.name}
                onChangeText={(text) => setBar({...bar, name: text})}
                mode="outlined"
                style={styles.input}
                error={!!errors.name}
            />
            {errors.name && <HelperText type="error">{errors.name}</HelperText>}

            <TextInput
                label="Description"
                value={bar.description}
                onChangeText={(text) => setBar({...bar, description: text})}
                mode="outlined"
                multiline
                numberOfLines={4}
                style={styles.input}
                error={!!errors.description}
            />
            {errors.description && <HelperText type="error">{errors.description}</HelperText>}

            <TextInput
                label="Search Location"
                value={bar.address}
                onChangeText={(text) => {
                  setBar({...bar, address: text});
                  setSearchQuery(text);
                }}
                mode="outlined"
                style={styles.input}
                error={!!errors.address}
            />

            {loading && <ActivityIndicator style={styles.loader}/>}

            {predictions.length > 0 && (
                <View style={styles.predictionsContainer}>
                  {predictions.map((prediction,index) => (
                      <List.Item
                          key={index}
                          title={prediction.description}
                          onPress={() => handlePlaceSelect(prediction.place_id)}
                          style={styles.predictionItem}
                      />
                  ))}
                </View>
            )}

            {bar.geoLocation.latitude && bar.geoLocation.longitude && (
                <Text style={styles.locationInfo}>
                  Selected location: {bar.address}
                </Text>
            )}

            <View style={styles.buttonContainer}>
              <Button
                  mode="outlined"
                  onPress={() => navigation.goBack()}
                  style={styles.button}
                  disabled={loading}
              >
                Cancel
              </Button>
              <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.button}
                  loading={loading}
                  disabled={loading}
              >
                Create Bar
              </Button>
            </View>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  surface: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  predictionsContainer: {
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    maxHeight: 200,
  },
  predictionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  locationInfo: {
    marginTop: 8,
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    marginBottom: 24,
  },
  button: {
    minWidth: 120,
  },
  loader: {
    marginVertical: 16,
  },
});

export default BarScreen;
