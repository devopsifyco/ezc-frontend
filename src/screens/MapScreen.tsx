import React from 'react';
import {Text} from 'react-native';
import {View, StyleSheet} from 'react-native';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MapScreen;
