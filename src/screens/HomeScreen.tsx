import react, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

import LiveCard from '../components/LiveCard';
import ListCard from '../components/ListCard';
import Slides from '../components/Slides';

import { NavigateType } from '../models/Navigations';


import { useGetAllChallenges } from '../hooks/useChallenge';


const HomeScreen: React.FC<NavigateType> = ({ navigation }) => {

  const { data: challenges, mutate: getChallenges } = useGetAllChallenges();

  useEffect(() => {
    getChallenges();
  }, [getChallenges]);

  
  const handleNotificationPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const handlePress = (id: string) => {
    navigation.navigate('ChallengeDetail', { id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logoEZC.png')} />
        <Text style={styles.titles}>Home</Text>
        <TouchableOpacity onPress={handleNotificationPress}>
          <Image source={require('../assets/icons/notification.png')} />
        </TouchableOpacity>
      </View>


        <View style={{ height: 150 }}>
          <Slides />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionName}>Processing</Text>
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
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <LiveCard
                id={item._id}
                key={item.id ? item.id.toString() : index.toString()}
                start_time={item.start_time}
                end_time={item.end_time}
                title={item.title}
                company={item.company}
                address={item.address}
                images_path={item.images_path}
                isLive={item.isLive}
                points_reward={item.points_reward}
                description={item.description}
                onPress={() => handlePress(item._id)}

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
      <View style={{ flex: 1 }}>
        <FlatList
          data={challenges}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item, index }) => (
            <ListCard
              id={item._id}
              description={item.description}
              key={item.id ? item.id.toString() : index.toString()}
              start_time={item.start_time}
              end_time={item.end_time}
              title={item.title}
              company={item.company}
              address={item.address}
              images_path={item.images_path}
              isLive={item.isLive}
              points_reward={item.points_reward}
              onPress={() => handlePress(item._id)}
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
})
