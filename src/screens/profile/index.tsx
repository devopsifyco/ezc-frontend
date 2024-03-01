import { EZCHALLENG_API } from '../../api/endPoint';
import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataProfile } from '../../models/Profile';
import axios from 'axios';
const USER_API = `${EZCHALLENG_API}/user`;

export default function ProfileScreen({ navigation }: NavigateType) {
  const [DATA, setData] = useState<DataProfile | null>(null);
  const [selectedTab, setSelectedTab] = useState('ABOUT');

  useEffect(() => {
    const fetchData = async () => {
      try {
        AsyncStorage.getItem('email').then(async (email) => {
          const token = await AsyncStorage.getItem('accessToken');
          const emailUser = email?.slice(1, -1);
          const res = await axios.post(USER_API, {
            email: emailUser,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          const data = res.data;
          setData(data);
        }).catch((error) => {
          console.error('Error retrieving email:', error);
        });
      } catch (error) {
        console.log('User profile error:', error);
      }
    };

    fetchData();
  }, []);

  const handleFllow = () => {
    Alert.alert('Oke m');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderProfile navigation={navigation} />
        <TouchableOpacity
          onPress={() => navigation.navigate('SubProfileScreen', { DATA })}>
          <Image source={require('../../assets/profile/menu-toggle.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <Image source={DATA?.avatar} style={styles.profileImage} />
        <Text style={styles.profileName}>{DATA?.username}</Text>
        <View style={styles.numberStatus}>
          <View style={styles.itemfllowing}>
            <Text style={styles.itemNumber}>23</Text>
            <Text style={styles.titleMedium}>Following</Text>
          </View>
          <View style={styles.arrowMiddle} />
          <View style={styles.itemfllower}>
            <Text style={styles.itemNumber}>161</Text>
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
          onPress={handleFllow}
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

      {selectedTab === 'ABOUT' && <AboutScreen data={DATA?.about_me} />}
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
