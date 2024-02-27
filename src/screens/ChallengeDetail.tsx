import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import react, { useEffect, useState } from 'react';
import { NavigateType } from '../models/Navigations';
import { Challenge } from '../models/InfChallenge';
import ListCard from '../components/ListCard';
import axios from 'axios';

const SeeAllChallenges = ({ navigation }: NavigateType) => {

 

  return (
    <View style={styles.container}>
      
    </View>
  )
}

export default SeeAllChallenges

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    marginTop: 32
  },
  titles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#363636',
    marginLeft: '30%',
  }


})