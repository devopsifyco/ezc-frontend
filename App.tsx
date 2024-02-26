import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EZChallenge from './src/screens/EZChallenge';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import CreateChallenges from './src/CreateChallenges/Information';
import Datetime from './src/CreateChallenges/Datetime';
import { StyledEngineProvider } from '@mui/material/styles';
import Date from './src/CreateChallenges/Date';

const queryClient = new QueryClient();

const App = () => {
  return (
    <CreateChallenges/>
  //   <React.StrictMode>
  //   <StyledEngineProvider injectFirst>
  //     <Datetime />
  //   </StyledEngineProvider>
  // </React.StrictMode>
    // <QueryClientProvider client={queryClient}>
    //   <NavigationContainer>
    //     <EZChallenge />
    //   </NavigationContainer>
    // </QueryClientProvider>
  );
};

export default App;
