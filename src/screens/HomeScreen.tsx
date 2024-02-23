import react, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import LiveCard from '../components/LiveCard';
import ListCard from '../components/ListCard';
import Slides from '../components/Slides';

import { NavigateType } from '../models/Navigations';
import useGetAllChallenges from '../hooks/useChallange';



const HomeScreen: React.FC<NavigateType> = ({ navigation }) => {
  const { data: challenges,  mutate } = useGetAllChallenges();
  
  useEffect(() => {
    mutate();
  }, [mutate]);

  console.log('ggg', challenges)





  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logoEZC.png')} />
        <Text style={styles.titles}>Home</Text>
        <Image source={require('../assets/icons/notification.png')} />
      </View>

      <View style={{ height: 150 }}>
        <Slides />
      </View>


      <View style={styles.section}>
        <Text style={styles.sectionName}>Live right now</Text>
        <TouchableOpacity style={styles.seeAll}>
          <Text
            onPress={() => navigation.navigate('SeeAllLive')}
          >See All</Text>
          <Image source={require('../assets/icons/iconSeeAll.png')} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={challenges}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LiveCard
              date={item.Days}
              isLive={item.isLive}
              title={item.title}
              location={item.Address}
              images={item.images}
            />
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionName}>Challenges</Text>
        <TouchableOpacity style={styles.seeAll}>
          <Text
            onPress={() => navigation.navigate('SeeAllChallange')}
          >See All</Text>
          <Image source={require('../assets/icons/iconSeeAll.png')} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={challenges}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (
            <ListCard
              date={item.Days}
              title={item.name}
              location={item.Address}
              images={item.images}
            />

          )}
        />
      </View>

    </View>

  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
  },
  titles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#363636',
    marginRight: 50,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  seeAll: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  sectionName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#120D26',
  },
});
