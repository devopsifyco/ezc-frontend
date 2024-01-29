import React from 'react';
import {Alert, Image, Pressable, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import MapScreen from '../screens/MapScreen';
import EmptyScreen from '../screens/EmtyScreen';
import ProfileScreen from '../screens/profile';

const Tab = createBottomTabNavigator();
const URL_IMAGE = '../assets/bottom_tab/';

export default function BottomTabs() {
  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.moreAction}
          onPress={() => Alert.alert('Hello mày')}>
          <Image source={require(`${URL_IMAGE}/moreAction.png`)} />
        </Pressable>
      </View>

      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            let rn = route.name;
            let imageSource;

            if (rn === 'HomeScreen') {
              imageSource = require(`${URL_IMAGE}/home.png`);
            } else if (rn === 'ExploreScreen') {
              imageSource = require(`${URL_IMAGE}/calendar2.png`);
            } else if (rn === 'MapScreen') {
              imageSource = require(`${URL_IMAGE}/location.png`);
            } else if (rn === 'ProfileScreen') {
              imageSource = require(`${URL_IMAGE}/profile.png`);
            } else if (rn === 'Space') {
              return null;
            }

            return (
              <>
                <Image
                  source={imageSource}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: 35,
                    height: 35,
                    tintColor: focused ? '#FF890B' : '#D9D9D9',
                  }}
                />
              </>
            );
          },
          tabBarLabel: () => {
            return null;
          },
          tabBarStyle: {
            height: 85,
          },
        })}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="ExploreScreen" component={ExploreScreen} />
        <Tab.Screen name="Space" component={EmptyScreen} />
        <Tab.Screen name="MapScreen" component={MapScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
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
  middleScreen: {width: 20},
});
