import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EZChallenge from './src/screens/EZChallenge';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import UpdateChallenge from './src/screens/challenge/UpdateChallenge';
import {
  View,
} from 'react-native';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <NavigationContainer>
        <EZChallenge/>
      </NavigationContainer> */}
      <UpdateChallenge />
    </QueryClientProvider>
  );
};

export default App;
