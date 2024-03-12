import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {NavigateType} from '../models/Navigations';

export default function HeaderChallenge({navigation}: NavigateType) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{position: 'absolute'}} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/profile/back.png')} />
      </TouchableOpacity>
      <Text style={styles.title}>Challenge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: '#120D26',
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    marginBottom: 10,
  },
});
