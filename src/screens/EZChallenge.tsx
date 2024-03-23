import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import VerifyRegisterScreen from './VerifyRegisterScreen';
import ForgotPassword from './ForgotPassword';
import BottomTabs from '../models/routers/BottomTabs';
import SeeAllChallenges from './SeeAllChallenges';
import SeeAllLive from './SeeAllLive';
import ListGift from './Gift/SubExChangeGift';
import GiftDetail from './Gift/GiftDetail';
import SubProfileScreen from './profile/ProfileScreen';
import EditProfile from './profile/EditProfile';
import ChallengeDetail from './ChallengeDetail';
import { Welcome, Welcome2, Welcome3 } from './Welcome';
import RatingScreen from './RatingScreen';
import ChatScreen from './ChatScreen';
import NotificationScreen from './Notification';
import GroupScreen from './GroupScreen';
import UpdateChallenges from './challenges/update';
import PendingScreen from './Status/PendingScreen';
import Status from './Status';
import CreateChallenges from './challenges/create';
import CheckIn from './challenges/checkin';
import ParticipantScreen from './ParticipantScreen';
import Giveaways from './Gift/Giveaways';
import ExChangeGift from './Gift/ExChangeGift';
import DonationScreen from './donate';


const Stack = createNativeStackNavigator();

export default function EZChallenge() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Welcome2" component={Welcome2} />
        <Stack.Screen name="Welcome3" component={Welcome3} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="VerifyRegisterScreen" component={VerifyRegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ListGift" component={ListGift} />
        <Stack.Screen name="GiftDetail" component={GiftDetail} />
        <Stack.Screen name="Giveaways" component={Giveaways} />
        <Stack.Screen name="ExchangeGifts" component={ExChangeGift} />
        <Stack.Screen name="EZChallenge" component={BottomTabs} />
        <Stack.Screen name="Status" component={Status} />
        <Stack.Screen name="SubProfileScreen" component={SubProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="SeeAllChallange" component={SeeAllChallenges} />
        <Stack.Screen name="SeeAllLive" component={SeeAllLive} />
        <Stack.Screen name="RatingScreen" component={RatingScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="GroupScreen" component={GroupScreen} />
        <Stack.Screen name='NotificationScreen' component={NotificationScreen} />
        <Stack.Screen name="ChallengeDetail" component={ChallengeDetail} />
        <Stack.Screen name="UpdateChallenge" component={UpdateChallenges} />
        <Stack.Screen name="CreateChallenges" component={CreateChallenges} />
        <Stack.Screen name='CheckIn' component={CheckIn} />
        <Stack.Screen name="Participant" component={ParticipantScreen} />
        <Stack.Screen name='DonationScreen' component={DonationScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
