import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { DataProfile } from '../../models/Profile';

export default function AboutScreen({data}: {data: DataProfile}) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{data.about_me}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  description: {
    marginBottom: 16,
    color: '#120D26',
  },
});
