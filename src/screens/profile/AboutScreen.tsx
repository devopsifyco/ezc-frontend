import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataProfile } from '../../models/Profile';

export default function AboutScreen({ data }: { data: DataProfile | null }) {
  return (
    <View style={styles.container}>
      {data && data.about_me ? (
        <Text style={styles.description}>{data.about_me}</Text>
      ) : (
        <Text style={styles.description}>No information available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  description: {
    marginBottom: 16,
    color: '#120D26',
  },
});
