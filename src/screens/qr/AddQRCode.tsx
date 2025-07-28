import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import {
  Button,
  Surface,
  Text,
  TextInput,
  Switch
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { barService } from '../../services/bar.ts';
import { qrService } from '../../services/qr.ts';
import { useGlobalState } from '../reducer/reducers.tsx';
import { BarDto } from '../../interface/bar.ts';
import {MenuDropdown} from "../components/MenuDropdown.tsx";

const AddQRCode = ({ navigation }) => {
  const [bars, setBars] = useState<BarDto[]>([]);
  const [email, setEmail] = useState('');
  const [count, setCount] = useState('');
  const [hasTableNumber, setHasTableNumber] = useState(false);
  const [selectedBarId, setSelectedBarId] = useState<number | null>(null);

  const state = useGlobalState();

  useFocusEffect(
      useCallback(() => {
        const fetchBars = async () => {
          try {
            const response = await barService.getBarsByCompany(state.auth.user?.company.id);
            if (response) {
              setBars(response);
            }
          } catch (error) {
            console.error('Error fetching bars:', error);
          }
        };

        fetchBars();
      }, [state.auth.user?.company.id])
  );

  const createQRCodes = async () => {
    if (!selectedBarId || !email || !count) {
      return;
    }

    const qr = {
      count: parseInt(count),
      barId: selectedBarId,
      hasTableNumber,
      email,
    };

    const response: boolean = await qrService.createQRCodes(qr);
    if (response) {
      navigation.navigate('QRCode');
    }
  };

  const barOptions = bars.map((bar) => ({
    label: bar.name,
    value: bar.id.toString(),
  }));

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
      >
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>
            Create QR Codes
          </Text>

          <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
          />

          <TextInput
              mode="outlined"
              label="Number of Tables"
              value={count}
              onChangeText={setCount}
              keyboardType="numeric"
              style={styles.input}
          />

          <View style={styles.switchContainer}>
            <Text>Include Table Number</Text>
            <Switch value={hasTableNumber} onValueChange={setHasTableNumber} />
          </View>

          <MenuDropdown
              options={barOptions}
              selected={selectedBarId?.toString()}
              onSelect={(val) => setSelectedBarId(Number(val))}
              placeholder="Select Bar"
          />

          <Button mode="contained" onPress={createQRCodes} style={styles.button}>
            Create
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
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    paddingVertical: 6,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default AddQRCode;
