import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EZChallenge from './src/screens/EZChallenge';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <NavigationContainer>
      {/* <EZChallenge /> */}
      <HomeScreen/>
    </NavigationContainer>
  );
};

export default App;
