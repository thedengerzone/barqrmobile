import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Surface, Text, TextInput, Button, Switch } from 'react-native-paper';
import { qrService } from '../../services/qr.ts';

const EditQRCode = ({ route, navigation }) => {
  const { code } = route.params;
  const [loading, setLoading] = useState(true);
  const [qrData, setQrData] = useState<any>(null);
  const [tableNumber, setTableNumber] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(true);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const data = await qrService.getQRCodeById(code);
        if (data) {
          setQrData(data);
          setTableNumber(data.tableNumber ? data.tableNumber.toString() : '');
          setActive(data.active);
        }
      } catch (error) {
        console.error('Error fetching QR code details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQRCode();
  }, [code]);

  const saveChanges = async () => {
    try {
      const updatedData = {
        ...qrData,
        tableNumber: tableNumber ? parseInt(tableNumber) : null,
        email,
        active,
      };
      const response = await qrService.updateQRCode(updatedData);
      if (response) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating QR code:', error);
    }
  };

  if (loading) {
    return (
        <View style={styles.center}>
          <Text>Loading QR Code...</Text>
        </View>
    );
  }

  if (!qrData) {
    return (
        <View style={styles.center}>
          <Text>QR Code not found</Text>
        </View>
    );
  }

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
      >
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>
            Edit QR Code
          </Text>

          <Text style={styles.label}>QR Code: {qrData.code}</Text>

          <TextInput
              mode="outlined"
              label="Table Number"
              value={tableNumber}
              onChangeText={setTableNumber}
              keyboardType="numeric"
              style={styles.input}
          />

          <View style={styles.switchContainer}>
            <Text>Active</Text>
            <Switch value={active} onValueChange={setActive} />
          </View>

          <Button mode="contained" onPress={saveChanges} style={styles.button}>
            Save Changes
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: 12,
    fontSize: 16,
  },
});

export default EditQRCode;
