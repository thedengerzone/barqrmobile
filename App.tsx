// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import LoginScreen from './src/screens/auth/LoginScreen.tsx';
import RegisterScreen from './src/screens/auth/RegisterScreen.tsx';
import HomeScreen from './src/screens/HomeScreen.tsx';
import CompanyScreen from "./src/screens/company/CompanyScreen.tsx";
import BarScreen from './src/screens/bar/BarScreen.tsx';
import BarPickerScreen from "./src/screens/bar/BarPickerScreen.tsx";
import CompanySettingsScreen from "./src/screens/company/CompanySettingsScreen.tsx";
import MenuSettingsScreen from "./src/screens/menu/MenuSettingsScreen.tsx";
import UserSettingsScreen from "./src/screens/UserSettingsScreen.tsx";
import BarSettingsScreen from "./src/screens/bar/BarSettingsScreen.tsx";
import EditMenuScreen from "./src/screens/menu/EditMenuScreen.tsx";
// Import your existing screens

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
      <SafeAreaProvider>
        <PaperProvider>
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
              <Stack.Screen name="Bar" component={BarScreen} />
              <Stack.Screen name="BarPicker" component={BarPickerScreen}/>
              <Stack.Screen name="CompanySettings" component={CompanySettingsScreen}/>
              <Stack.Screen name="MenuSettings" component={MenuSettingsScreen}/>
              <Stack.Screen name="EditMenu" component={EditMenuScreen}/>
              <Stack.Screen name="UserSettings" component={UserSettingsScreen}/>
              <Stack.Screen name="BarSettings" component={BarSettingsScreen}/>

              {/* Add your other screens here */}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
  );
}

export default App;
