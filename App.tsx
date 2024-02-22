import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EZChallenge from './src/screens/EZChallenge';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RatingScreen from './src/screens/RatingScreen';
import HomeScreen from './src/screens/HomeScreen';
import SeeAllChallenges from './src/screens/SeeAllChallenges';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RatingScreen/>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
