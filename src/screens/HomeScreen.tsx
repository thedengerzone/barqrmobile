import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, useTheme} from 'react-native-paper';
import OrdersScreen from './order/OrdersScreen.tsx';
import ProfileScreen from './ProfileScreen.tsx';
import QRSettingsScreen from './QRSettingsScreen.tsx';
import {useRoute} from '@react-navigation/native';
import CompanySettingsScreen from "./company/CompanySettingsScreen.tsx";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const theme = useTheme();
  const route = useRoute();
  const {barId} = route.params;

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
            initialParams={{barId}}
            options={{
              tabBarIcon: ({color}) => (
                  <Icon color={color} source="menu" size={20}/>
              ),
            }}
        />
        <Tab.Screen
            name="Company"
            component={CompanySettingsScreen}
            initialParams={{barId}}
            options={{
              tabBarIcon: ({color}) => (
                  <Icon color={color} source="qrCodeEdit" size={20}/>
              ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            initialParams={{barId}}
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
