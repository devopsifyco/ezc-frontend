import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EZChallenge from './src/screens/EZChallenge';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SeeAllMyChallenges from './src/screens/SeeAllMyChallenges';
import Status from './src/screens/Status';


const queryClient = new QueryClient();

const App = () => {
  return (
    // <Status/>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <EZChallenge/>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
