import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View,} from 'react-native';
import {
  ActivityIndicator,
  Button,
  HelperText,
  List,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BarDto} from '../../interface/bar';
import {barService} from '../../services/bar';
import {
  AutocompleteResponse,
  Location,
  PlaceDetailsResponse,
  Prediction,
} from '../../interface/places';
import {placesService} from '../../services/places';
import {useGlobalState} from "../reducer/reducers.tsx";

const EditBarScreen = () => {
  const navigation = useNavigation();
  const state = useGlobalState()
  const route = useRoute();
  const {id} = route.params as { id: number };

  const [bar, setBar] = useState<BarDto | null>(null);
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({name: '', description: '', address: ''});

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await barService.getBarDetails(id, state.auth.user?.company.id);
        setBar(data);
        setQuery(data.address);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    const deb = setTimeout(async () => {
      if (query.length >= 3) {
        setLoading(true);
        try {
          const res: AutocompleteResponse = await placesService.searchPlaces(query);
          setPredictions(res.predictions);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      } else setPredictions([]);
    }, 300);
    return () => clearTimeout(deb);
  }, [query]);

  const pickAddress = async (place_id: string) => {
    setLoading(true);
    try {
      const res: PlaceDetailsResponse = await placesService.searchPlaceDetails(place_id);
      const loc: Location = res.result.geometry.location;
      setBar(prev => prev && ({
        ...prev,
        address: res.result.formatted_address,
        geoLocation: {latitude: loc.lat, longitude: loc.lng},
      }));
      setQuery(res.result.formatted_address);
      setPredictions([]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (!bar) return false;
    const errs = {name: '', description: '', address: ''};
    let ok = true;
    if (!bar.name.trim()) {
      errs.name = 'Required';
      ok = false;
    }
    if (!bar.description.trim()) {
      errs.description = 'Required';
      ok = false;
    }
    if (!bar.address.trim()) {
      errs.address = 'Required';
      ok = false;
    }
    setErrors(errs);
    return ok;
  };

  const saveBar = async () => {
    if (!bar || !validate()) return;
    setLoading(true);
    try {
      await barService.upsert(bar);
      navigation.goBack();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !bar) return <ActivityIndicator style={styles.loader}/>;
  if (!bar) return null;

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Surface style={styles.surface}>
            <Text variant="headlineMedium" style={styles.title}>Edit Bar</Text>

            {/* Name Input */}
            <TextInput
                label="Bar Name"
                value={bar.name}
                onChangeText={text => setBar({...bar, name: text})}
                error={!!errors.name} style={styles.input}
            />
            {!!errors.name && <HelperText type="error">{errors.name}</HelperText>}

            {/* Description Input */}
            <TextInput
                label="Description"
                value={bar.description}
                onChangeText={text => setBar({...bar, description: text})}
                multiline
                error={!!errors.description}
                style={styles.input}
            />
            {!!errors.description && <HelperText type="error">{errors.description}</HelperText>}

            {/* Address Autocomplete */}
            <TextInput
                label="Search Address"
                value={query}
                onChangeText={text => {
                  setQuery(text);
                  setBar(prev => prev ? {...prev, address: text} : prev);
                }}
                error={!!errors.address}
                style={styles.input}
            />
            {!!errors.address && <HelperText type="error">{errors.address}</HelperText>}

            {loading && <ActivityIndicator style={styles.loader}/>}
            {!!predictions.length && (
                <View style={styles.predictions}>
                  {predictions.map((p, i) => (
                      <List.Item
                          key={i}
                          title={p.description}
                          onPress={() => pickAddress(p.place_id)}
                          style={styles.predictionItem}
                      />
                  ))}
                </View>
            )}

            {/* readonly lat/lng display */}
            {bar.geoLocation.latitude != null && bar.geoLocation.longitude != null && (
                <Text style={styles.locationInfo}>
                  Coordinates: {bar.geoLocation.latitude.toFixed(6)}, {bar.geoLocation.longitude.toFixed(6)}
                </Text>
            )}

            {/* Actions */}
            <View style={styles.buttons}>
              <Button mode="outlined" onPress={() => navigation.goBack()} disabled={loading}>
                Cancel
              </Button>
              <Button mode="contained" onPress={saveBar} loading={loading} disabled={loading}>
                Save Changes
              </Button>
            </View>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  container: {flex: 1, backgroundColor: '#fff'},
  scroll: {flexGrow: 1},
  surface: {flex: 1, padding: 20},
  title: {textAlign: 'center', marginBottom: 24},
  input: {marginBottom: 16},
  predictions: {
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    maxHeight: 200,
  },
  predictionItem: {borderBottomWidth: 1, borderBottomColor: '#eee'},
  locationInfo: {
    marginTop: 8,
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    marginBottom: 24,
  },
});
export default EditBarScreen;
