import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textDemo}>EZ Challenge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
