import react, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, ImageSourcePropType } from 'react-native';
import LiveCard from '../components/LiveCard';
import ListCard from '../components/ListCard';
import axios from 'axios';


interface Challenge {
  id: string;
  Days: string;
  isLive: boolean;
  name: string;
  Address: string;
  images: ImageSourcePropType;
}


const HomeScreen: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://63aa9cf2fdc006ba6046fb58.mockapi.io/challenges');
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };
  
    fetchData();
  }, []);
  

  console.log(111, challenges)


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logoEZC.png')} />
        <Text style={styles.titles}>Home</Text>
        <Image source={require('../assets/icons/notification.png')} />
      </View>

      <View >
        <Image style={{ height: 150, width: '100%' }} source={require('../assets/slides.jpg')} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionName}>Live right now</Text>
        <TouchableOpacity style={styles.seeAll}>
          <Text>See All</Text>
          <Image source={require('../assets/icons/iconSeeAll.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={challenges}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LiveCard
            date={item.Days}
            isLive={item.isLive}
            title={item.name}
            location={item.Address}
            images={item.images}
          />
        )}
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionName}>Challenges</Text>
        <TouchableOpacity style={styles.seeAll}>
          <Text>See All</Text>
          <Image source={require('../assets/icons/iconSeeAll.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView
      >
        <ListCard />
      </ScrollView>

    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13
  },
  titles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#363636',
    marginRight: 50
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10

  },
  seeAll: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',

  },
  sectionName: {
    fontSize: 18,
    fontWeight: '500',
    color: "#120D26",
  }
});