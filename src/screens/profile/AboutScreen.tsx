import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
interface DataProps {
  name: string;
  image: any;
  fllowing: number;
  fllower: number;
  title: string;
}

export default function AboutScreen({data}: {data: DataProps}) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{data.title}</Text>
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
