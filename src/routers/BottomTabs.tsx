import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import EmptyScreen from '../screens/EmtyScreen';
import ProfileScreen from '../screens/profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faDonate,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import PlusButton from '../components/PlusButton';
import DonationScreen from '../screens/donate';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <>
      <View style={styles.container}>
        <PlusButton />
      </View>

      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({ route }: any) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }: any) => {
            let rn = route.name;
            let icon;

            if (rn === 'HomeScreen') {
              icon = faHouse;
            } else if (rn === 'DonationScreen') {
              icon = faDonate;
            } else if (rn === 'MapScreen') {
              icon = faLocationDot;
            } else if (rn === 'ProfileScreen') {
              icon = faUser;
            } else if (rn === 'Space') {
              return null;
            }

            const iconColor = focused ? '#FF890B' : '#D9D9D9';

            return <FontAwesomeIcon icon={icon} color={iconColor} size={28} />;
          },
          tabBarLabel: () => {
            return null;
          },
          tabBarStyle: {
            height: 85,
          },
        })}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="DonationScreen"
          component={DonationScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Space"
          component={EmptyScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    bottom: '7%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreAction: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleScreen: { width: 20 },
});
