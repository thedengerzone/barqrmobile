import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { barService } from '../../services/bar.ts';
import { qrService } from '../../services/qr.ts';
import { useGlobalState } from '../reducer/reducers.tsx';
import { BarDto } from '../../interface/bar.ts';
import { MenuDropdown } from '../components/MenuDropdown.tsx';
import {QR} from "../../interface/qr.ts";

const ManageQRCode = ({ navigation }) => {
  const [bars, setBars] = useState<BarDto[]>([]);
  const [selectedBarId, setSelectedBarId] = useState<number | null>(null);
  const [qrCodes, setQrCodes] = useState<QR[]>([]);
  const [loadingQRCodes, setLoadingQRCodes] = useState(false);

  const state = useGlobalState();

  // Fetch bars on screen load
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

  // Fetch QR codes when bar is selected
  useEffect(() => {
    if (selectedBarId) {
      const fetchQRCodes = async () => {
        setLoadingQRCodes(true);
        try {
          const response = await qrService.getQRCodesByBar(selectedBarId);
          if (response) {
            setQrCodes(response);
          } else {
            setQrCodes([]);
          }
        } catch (error) {
          console.error('Error fetching QR codes:', error);
        } finally {
          setLoadingQRCodes(false);
        }
      };
      fetchQRCodes();
    } else {
      setQrCodes([]);
    }
  }, [selectedBarId]);

  const barOptions = bars.map((bar) => ({
    label: bar.name,
    value: bar.id.toString(),
  }));

  return (
      <View style={styles.container}>
      <Surface style={styles.surface}>
      <Text variant="headlineMedium" style={styles.title}>
      Manage QR Codes
  </Text>

  {/* Bar Dropdown */}
  <MenuDropdown
      options={barOptions}
  selected={selectedBarId?.toString()}
  onSelect={(val) => setSelectedBarId(Number(val))}
  placeholder="Select Bar"
      />

      {/* Scan QR Code Button */}
      <Button
  mode="contained"
  style={styles.scanButton}
  onPress={() => navigation.navigate('QRScanner')}
>
  Scan QR Code
  </Button>

  {/* QR Codes List */}
  <ScrollView style={{ marginTop: 20 }}>
  {loadingQRCodes && <Text>Loading QR Codes...</Text>}
    {!loadingQRCodes && qrCodes.length === 0 && selectedBarId && (
        <Text>No QR codes found for this bar.</Text>
    )}
    {qrCodes.map((code) => (
        <Surface key={code.id} style={styles.qrCard}>
    <Text>Table: {code.tableNumber ?? 'N/A'}</Text>
    <Text>Status: {code.active ? 'Active' : 'Inactive'}</Text>
    <Button
      mode="outlined"
      style={{ marginTop: 8 }}
      onPress={() => navigation.navigate('EditQRCode', { code: code.id })}
    >
      Edit
      </Button>
      </Surface>
    ))}
    </ScrollView>
    </Surface>
    </View>
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
      marginBottom: 16,
    },
    scanButton: {
      marginTop: 16,
      paddingVertical: 6,
    },
    qrCard: {
      padding: 16,
      marginBottom: 12,
      borderRadius: 8,
      backgroundColor: '#f5f5f5',
    },
  });

  export default ManageQRCode;
