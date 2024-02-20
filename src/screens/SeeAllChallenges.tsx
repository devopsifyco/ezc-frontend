import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import react, { useEffect, useState } from 'react';
import { NavigateType } from '../models/Navigations';
import { Challenge } from '../models/InfChallenge';
import ListCard from '../components/ListCard';
import axios from 'axios';

const SeeAllChallenges = ({ navigation }: NavigateType) => {

  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://63aa9cf2fdc006ba6046fb58.mockapi.io/challenges',
        );
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchData();
  }, []);
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