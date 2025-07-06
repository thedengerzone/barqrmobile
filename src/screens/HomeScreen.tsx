import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, useTheme} from 'react-native-paper';
import OrdersScreen from './order/OrdersScreen.tsx';
import ProfileScreen from './ProfileScreen.tsx';
import {useRoute} from '@react-navigation/native';
import ConfigurationSettingsScreen from "./company/ConfigurationSettingsScreen.tsx";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const theme = useTheme();
  const route = useRoute();

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
              tabBarIcon: ({color}) => (
                  <Icon color={color} source="menu" size={20}/>
              ),
            }}
        />
        <Tab.Screen
            name="Configuration"
            component={ConfigurationSettingsScreen}
            options={{
              tabBarIcon: ({color}) => (
                  <Icon color={color} source="qrCodeEdit" size={20}/>
              ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({color}) => (
                  <Icon color={color} source="account" size={20}/>
              ),
            }}
        />
      </Tab.Navigator>
  );
};

export default HomeScreen;
