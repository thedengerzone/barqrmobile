// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import LoginScreen from './src/screens/auth/LoginScreen.tsx';
import RegisterScreen from './src/screens/auth/RegisterScreen.tsx';
import HomeScreen from './src/screens/HomeScreen.tsx';
import CompanyScreen from "./src/screens/company/CompanyScreen.tsx";
import BarScreen from './src/screens/bar/BarScreen.tsx';
import BarPickerScreen from "./src/screens/bar/BarPickerScreen.tsx";
import ConfigurationSettingsScreen from "./src/screens/company/ConfigurationSettingsScreen.tsx";
import MenuSettingsScreen from "./src/screens/menu/MenuSettingsScreen.tsx";
import BarSettingsScreen from "./src/screens/bar/BarSettingsScreen.tsx";
import EditMenuScreen from "./src/screens/menu/EditMenuScreen.tsx";
import MultiCaptureScreen from "./src/screens/camera/MultiCaptureScreen.tsx";
import CreateMenuScreen from "./src/screens/menu/CreateMenuScreen.tsx";
import {GlobalProvider} from "./src/screens/reducer/reducers.tsx";
import EditBarScreen from "./src/screens/bar/EditBarScreen.tsx";
import AddUserScreen from "./src/screens/user/AddUserScreen.tsx";
import UserSettingsScreen from "./src/screens/user/UserSettingsScreen.tsx";
import ChangePasswordScreen from "./src/screens/user/ChangePasswordScreen.tsx";
import QrSettingsScreen from "./src/screens/qr/QRSettingsScreen.tsx";
import AddQRCode from "./src/screens/qr/AddQRCode.tsx";
import ManageQRCode from "./src/screens/qr/ManageQRCode.tsx";
import QRScanner from "./src/screens/qr/QRScanner.tsx";
import EditQRCode from "./src/screens/qr/EditQRCode.tsx";
// Import your existing screens

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
      <GlobalProvider>
      <SafeAreaProvider>
        <PaperProvider theme={DefaultTheme}>
          <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
            >
              <Stack.Screen name="Login" component={LoginScreen}  options={{
                headerShown: false,
              }}/>
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Company" component={CompanyScreen} />
              <Stack.Screen name="NewBar" component={BarScreen} />
              <Stack.Screen name="BarPicker" component={BarPickerScreen}/>
              <Stack.Screen name="EditBar" component={EditBarScreen}/>
              <Stack.Screen name="ConfigurationSettings" component={ConfigurationSettingsScreen}/>
              <Stack.Screen name="MenuSettings" component={MenuSettingsScreen}/>
              <Stack.Screen name="EditMenu" component={EditMenuScreen}/>
              <Stack.Screen name="BarSettings" component={BarSettingsScreen}/>
              <Stack.Screen name="Camera" component={MultiCaptureScreen}/>
              <Stack.Screen name="CreateMenu" component={CreateMenuScreen}/>
              <Stack.Screen name="UserSettings" component={UserSettingsScreen}/>
              <Stack.Screen name="AddUser" component={AddUserScreen}/>
              <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
              <Stack.Screen name="QRCode" component={QrSettingsScreen}/>
              <Stack.Screen name="AddQRCode" component={AddQRCode}/>
              <Stack.Screen name="ManageQRCode" component={ManageQRCode}/>
              <Stack.Screen name="EditQRCode" component={EditQRCode}/>
              <Stack.Screen name="QRScanner" component={QRScanner}/>

              {/* Add your other screens here */}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
      </GlobalProvider>
  );
}

export default App;
