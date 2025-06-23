import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Linking, Platform, StyleSheet, View,} from 'react-native';
import {Button, Card, Divider, IconButton, Surface, Text, useTheme,} from 'react-native-paper';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import * as mime from 'react-native-mime-types';
import {ocrService} from "../../services/ocr.ts";
import {useNavigation} from "@react-navigation/native";
import {MenuItem} from "../../interface/menu.ts"; // Install if not available

export default function MultiCaptureScreen() {
  const camera = useRef<Camera>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const device = useCameraDevice('back');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log('📷 Permission status:', status);
      setHasPermission(status === 'granted');

      if (status !== 'granted') {
        Alert.alert(
            'Camera Permission Needed',
            'Please enable camera permission in settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
            ]
        );
      }
    })();
  }, []);

  const capturePhoto = async () => {
    if (isCameraReady && camera.current) {
      try {
        const photo = await camera.current.takePhoto({ flash: 'off' });
        const uri = Platform.OS === 'ios' ? photo.path : `file://${photo.path}`;
        setPhotos(prev => [...prev, uri]);
      } catch (e) {
        console.error('Failed to take photo', e);
      }
    }
  };

  const sendToOCR = async () => {
    if (photos.length === 0) {
      Alert.alert('No photos', 'Please capture some photos first.');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();

      photos.forEach((uri, index) => {
        const name = `photo_${index}.jpg`;
        const cleanUri = uri.replace('file://', '');
        const type = mime.lookup(cleanUri) || 'image/jpeg';

        formData.append('images', {
          uri,
          name,
          type,
        } as any);
      });

      const items: MenuItem[] = await ocrService.createMenuFromImageOcr(formData)

      navigation.navigate('CreateMenu', { menuItems: items })
    } catch (err) {
      console.error('Failed to upload to OCR', err);
      Alert.alert('Upload Error', 'Failed to send images to OCR service.');
    } finally {
      setUploading(false);
    }
  };

  if (!hasPermission) {
    return (
        <Surface style={styles.centered}>
          <Text variant="titleMedium">📷 Please grant camera permission</Text>
        </Surface>
    );
  }

  if (device == null) {
    return (
        <Surface style={styles.centered}>
          <Text variant="titleMedium">Loading camera...</Text>
        </Surface>
    );
  }

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Camera
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
            ref={camera}
            onInitialized={() => setIsCameraReady(true)}
            onError={err => console.error('Camera error', err)}
        />

        <View style={styles.captureContainer}>
          <Button
              icon="camera"
              mode="contained"
              onPress={capturePhoto}
              disabled={!isCameraReady}
          >
            Capture Photo
          </Button>

          <Button
              icon="upload"
              mode="outlined"
              onPress={sendToOCR}
              disabled={uploading || photos.length === 0}
              style={{ marginTop: 8 }}
          >
            {uploading ? 'Uploading...' : 'Send to OCR'}
          </Button>
        </View>

        <Divider />

        <FlatList
            data={photos}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.photoList}
            ListHeaderComponent={<Text style={styles.photoHeader}>Captured Photos</Text>}
            renderItem={({ item }) => (
                <Card mode="outlined" style={styles.photoCard}>
                  <Card.Cover source={{ uri: item }} style={styles.photo} />
                  <Card.Actions>
                    <IconButton
                        icon="delete"
                        onPress={() => {
                          setPhotos(prev => prev.filter(p => p !== item));
                        }}
                    />
                  </Card.Actions>
                </Card>
            )}
        />
      </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 2,
  },
  captureContainer: {
    padding: 16,
    alignItems: 'center',
  },
  photoList: {
    paddingBottom: 16,
  },
  photoHeader: {
    fontSize: 18,
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  photoCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  photo: {
    height: 200,
  },
});
