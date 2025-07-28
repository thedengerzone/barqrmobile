import {Camera, useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import {extractIdFromUrl} from "../../utils";

const QRScanner = ({navigation}) => {
  const device = useCameraDevice("back");
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes && codes.length > 0) {
        navigation.navigate('EditQrCode', {code: extractIdFromUrl(codes[0].value)});
      }
    },
  });

  if (!device) return null;

  return (
      <Camera
          style={{flex: 1}}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
      />
  );
};


export default QRScanner