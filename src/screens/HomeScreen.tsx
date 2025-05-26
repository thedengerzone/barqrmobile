// src/screens/HomeScreen.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import OrdersScreen from './OrdersScreen.tsx';
import ProfileScreen from './ProfileScreen.tsx';
import QRSettingsScreen from './QRSettingsScreen.tsx';
import { Icon } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const theme = useTheme();

  return (
      <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.secondary,
            headerShown: true,
            tabBarStyle: {
              paddingVertical: 5,
            },
          }}
      >
        <Tab.Screen
            name="Orders"
            component={OrdersScreen}
            options={{
              tabBarIcon: ({ color}) => (
                  <Icon color={color} source="menu" size={20}/>
              ),
            }}
        />
        <Tab.Screen
            name="QR Settings"
            component={QRSettingsScreen}
            options={{
              tabBarIcon: ({ color}) => (
                  <Icon color={color} source="qrCodeEdit" size={20}/>
              ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color}) => (
                  <Icon color={color} source="account" size={20}/>
              ),
            }}
        />
      </Tab.Navigator>
  );
};

export default HomeScreen;
