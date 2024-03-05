import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import react, { useEffect, useState } from 'react';
import { NavigateType } from '../models/Navigations';
import ListCard from '../components/ListCard';
import {useGetAllChallenges} from '../hooks/useChallenge';

const SeeAllChallenges = ({ navigation }: NavigateType) => {

  const { data: challenges, mutate } = useGetAllChallenges();

  useEffect(() => {
    mutate();
  }, [mutate]);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Image source={require('../assets/icons/arrow-left.png')} />
        </TouchableOpacity>
        <Text style={styles.titles}>Challanges</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={challenges}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item, index }) => (
            <ListCard
              key={item.id ? item.id.toString() : index.toString()}
              Days={item.Days}
              title={item.title}
              Address={item.Address}
              images_path={item.images_path}
              isLive={item.isLive}
              onPress={() => navigation.navigate('ChallengeDetail')}

            />
          )}
        />
      </View>
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