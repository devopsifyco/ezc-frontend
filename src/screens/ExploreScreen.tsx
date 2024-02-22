import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigateType} from '../models/Navigations';

export default function ExploreScreen({navigation}: NavigateType) {
  return (
    <View style={styles.container}>
      <Text style={styles.textDemo}>ExploreScreen</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDemo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'tomato',
  },
});
