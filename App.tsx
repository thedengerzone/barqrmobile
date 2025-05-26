// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen.tsx';
import CompanyScreen from "./src/screens/CompanyScreen.tsx";
import BarScreen from './src/screens/BarScreen.tsx';
// Import your existing screens

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
      <SafeAreaProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                  headerShown: false,
                }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Company" component={CompanyScreen} />
              <Stack.Screen name="Bar" component={BarScreen} />

              {/* Add your other screens here */}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
  );
}

export default App;
