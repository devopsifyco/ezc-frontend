import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

interface HeaderChallengeProps  {
  title: string; 
  navigation: string | any;

}

export default function HeaderChallenge({navigation, title}: HeaderChallengeProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={() => navigation.goBack()}>
        <Image source={require('../assets/profile/back.png')} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight:"5%"
  },
  title: {
    fontSize: 20,
    color: '#120D26',
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    flex: 1,

  },
});
