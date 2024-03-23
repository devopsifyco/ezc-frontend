import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import EZChallenge from './src/screens/EZChallenge';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';




const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <EZChallenge />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
