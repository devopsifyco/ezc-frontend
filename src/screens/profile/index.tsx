import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ButtonProfile from '../../components/ButtonProfile';
import ButtonProfile2 from '../../components/ButtonProfile2';
import HeaderProfile from '../../components/HeaderProfile';
import {NavigateType} from '../../models/Navigations';
import AboutScreen from './AboutScreen';
import ChallengeScreen from './ChallengeScreen';
import ReviewScreen from './ReviewScreen';

const DATA = {
  name: 'A Tien',
  image: require('../../assets/profile/atien.jpg'),
  location: '101B Le Huu Trac',
  fllowing: 345,
  fllower: 55,
  title:
    'Em sống vì cộng đồng nên là thằng nào có tiền thì donate cho tao. Ít thì 5 quả trứng nhiều thì 1 quả tên lửa. Chúng mày nhớ chưa',
  interested: [
    'Game Online',
    'Concert',
    'Play Game',
    'Soccor',
    'Voleyball',
    'Reading',
    'Orther',
  ],
};

export default function ProfileScreen({navigation}: NavigateType) {
  const handleFllow = () => {
    Alert.alert('Oke m');
  };
  const [selectedTab, setSelectedTab] = useState('ABOUT');
  const handleMessage = () => {
    navigation.navigate('ChatScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderProfile navigation={navigation} />
        <TouchableOpacity
          onPress={() => navigation.navigate('SubProfileScreen', {DATA})}>
          <Image source={require('../../assets/profile/menu-toggle.png')} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profile}>
        <Image source={DATA.image} style={styles.profileImage} />
        <Text style={styles.profileName}>{DATA.name}</Text>
        <View style={styles.numberStatus}>
          <View style={styles.itemfllowing}>
            <Text style={styles.itemNumber}>{DATA.fllowing}</Text>
            <Text style={styles.titleMedium}>Following</Text>
          </View>
          <View style={styles.arrowMiddle} />
          <View style={styles.itemfllower}>
            <Text style={styles.itemNumber}>{DATA.fllower}</Text>
            <Text style={styles.titleMedium}>Followers</Text>
          </View>
        </View>
      </View>
      <View style={styles.actionInteraction}>
        <ButtonProfile
          title="Follow"
          icon={require('../../assets/profile/flower.png')}
          onPress={handleFllow}
        />
        <ButtonProfile2
          title="Message"
          icon={require('../../assets/profile/message.png')}
          onPress={handleMessage}
        />
      </View>
      <View style={styles.listActions}>
        <TouchableOpacity
          onPress={() => setSelectedTab('ABOUT')}
          style={[styles.tab, selectedTab === 'ABOUT' && styles.selectedTab]}>
          <Text style={styles.titleLarge}>ABOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('CHALLENGE')}
          style={[
            styles.tab,
            selectedTab === 'CHALLENGE' && styles.selectedTab,
          ]}>
          <Text style={styles.titleLarge}>CHALLENGE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('REVIEWS')}
          style={[styles.tab, selectedTab === 'REVIEWS' && styles.selectedTab]}>
          <Text style={styles.titleLarge}>REVIEWS</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'ABOUT' && <AboutScreen data={DATA} />}
      {selectedTab === 'CHALLENGE' && <ChallengeScreen />}
      {selectedTab === 'REVIEWS' && <ReviewScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#120D26',
  },
  numberStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  itemfllowing: {
    alignItems: 'center',
  },
  itemfllower: {
    alignItems: 'center',
  },
  itemNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#120D26',
  },

  titleLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#216C53',
  },
  interestItem: {
    fontSize: 14,
    marginBottom: 4,
    color: '#120D26',
  },
  titleMedium: {
    fontSize: 14,
    marginBottom: 4,
    color: '#120D26',
    opacity: 0.5,
  },
  arrowMiddle: {
    width: 1,
    height: 45,
    backgroundColor: '#120D26',
  },
  interestList: {},
  listActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionInteraction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderColor: '#216C53',
    width: 50,
  },
});
