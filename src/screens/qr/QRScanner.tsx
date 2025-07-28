import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {extractIdFromUrl} from "../../utils.ts";

const QRScanner = ({ navigation }) => {
  const onSuccess = (e) => {
    const scannedCode = e.data;
    // Navigate to QR details or do something with scanned code
    navigation.navigate('EditQrCode', { code: extractIdFromUrl(scannedCode)});
  };

  return (
      <View style={styles.container}>
        <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
            topContent={
              <Text style={styles.topText}>
                Align the QR code within the frame to scan.
              </Text>
            }
            bottomContent={
              <Button
                  mode="contained"
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
              >
                Cancel
              </Button>
            }
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    padding: 16,
  },
  backButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});

export default QRScanner;
