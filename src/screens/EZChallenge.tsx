import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import MoreRegisterScreen from './MoreRegisterScreen';
import VerifyRegisterScreen from './VerifyRegisterScreen';
import ForgotPassword from './ForgotPassword';
import BottomTabs from '../models/routers/BottomTabs';

const Stack = createNativeStackNavigator();

export default function EZChallenge() {
  const isAuthenticated = 'EZChallenge';

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'EZChallenge' : 'LoginScreen'}>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="MoreRegisterScreen"
          component={MoreRegisterScreen}
        />
        <Stack.Screen
          name="VerifyRegisterScreen"
          component={VerifyRegisterScreen}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Group>

      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="EZChallenge" component={BottomTabs} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
