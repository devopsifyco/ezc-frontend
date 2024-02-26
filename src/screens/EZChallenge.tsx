import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import VerifyRegisterScreen from './VerifyRegisterScreen';
import ForgotPassword from './ForgotPassword';
import BottomTabs from '../models/routers/BottomTabs';
import SeeAllChallenges from './SeeAllChallenges';
import SeeAllLive from './SeeAllLive';
import ListGift from './SubExChangeGift';
import ExchangeGifts from './ExchangeGifts';
import GiftDetail from './GiftDetail';
const Stack = createNativeStackNavigator();

export default function EZChallenge() {
  const isAuthenticated = "ExchangeGifts";

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'EZChallenge' : 'LoginScreen'}>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="VerifyRegisterScreen"
          component={VerifyRegisterScreen}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Group>

      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="SeeAllChallange" component={SeeAllChallenges} />
        <Stack.Screen name="SeeAllLive" component={SeeAllLive} />
      </Stack.Group>

      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ListGift" component={ListGift} />
        <Stack.Screen name="GiftDetail" component={GiftDetail} />
        <Stack.Screen name='ExchangeGifts' component={ExchangeGifts} />
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="EZChallenge" component={BottomTabs} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
