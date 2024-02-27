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
import SubProfileScreen from './profile/ProfileScreen';
import EditProfile from './profile/EditProfile';

import {Welcome, Welcome2, Welcome3} from './Welcome';
import RatingScreen from './RatingScreen';
import NotificationScreen from './Notification';

const Stack = createNativeStackNavigator();

export default function EZChallenge() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Welcome2" component={Welcome2} />
        <Stack.Screen name="Welcome3" component={Welcome3} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="VerifyRegisterScreen"
          component={VerifyRegisterScreen}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ListGift" component={ListGift} />
        <Stack.Screen name="GiftDetail" component={GiftDetail} />
        <Stack.Screen name="ExchangeGifts" component={ExchangeGifts} />
        <Stack.Screen name="EZChallenge" component={BottomTabs} />
        <Stack.Screen name="SubProfileScreen" component={SubProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="SeeAllChallange" component={SeeAllChallenges} />
        <Stack.Screen name="SeeAllLive" component={SeeAllLive} />
        <Stack.Screen name="RatingScreen" component={RatingScreen} />
        <Stack.Screen name='NotificationScreen' component={NotificationScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
