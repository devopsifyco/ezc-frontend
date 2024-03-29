import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import HeaderProfile from '../../components/HeaderProfile';
import { NavigateType } from '../../models/Navigations';
import AboutScreen from './AboutScreen';
import ChallengeScreen from './ChallengeScreen';
import useProfile from '../../hooks/useProfile';
import JoinedScreen from './JoinedScreen';
import { useGetHasJoinedChallenges } from '../../hooks/useChallenge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function ProfileScreen({ navigation }: NavigateType) {
  const [id_owner, setIdOwner] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('ABOUT');
  const { data: dataProfile, isLoading } = useProfile();
  const { data: hasJoined, mutate: getHasJoined } = useGetHasJoinedChallenges();

  useEffect(() => {
    const getOwnerId = async () => {
      try {
        const id_owner = await AsyncStorage.getItem('id_owner');
        setIdOwner(id_owner);
      } catch (error) {
        console.error('Lỗi khi lấy giá trị từ AsyncStorage:', error);
      }
    };

    getOwnerId();
  }, []);

  useEffect(() => {
    getHasJoined();
  }, [getHasJoined]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderProfile navigation={navigation} />
        <TouchableOpacity
          onPress={() => navigation.navigate('SubProfileScreen', { dataProfile })}>
          <FontAwesomeIcon icon={faBars} size={32} color='#216C53' />
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <Image
          source={dataProfile?.avatar.name ? { uri: dataProfile.avatar.name } : require('../../assets/profile/defaultAvatar.jpg')}
          style={styles.profileImage}
        />

        <Text style={styles.profileName}>{dataProfile?.username}</Text>
        <View style={styles.numberStatus}>
          <View style={styles.itemfllowing}>
            <Text style={styles.itemNumber}>{dataProfile?.points}</Text>
            <Text style={styles.titleMedium}>Points</Text>
          </View>
          <View style={styles.arrowMiddle} />
          <View style={styles.itemfllower}>
            <Text style={styles.itemNumber}>{hasJoined?.userChallenges ? hasJoined?.userChallenges.length : 0}</Text>
            <Text style={styles.titleMedium}>Challenges</Text>
          </View>
        </View>
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
          onPress={() => setSelectedTab('JOINED')}
          style={[
            styles.tab,
            selectedTab === 'JOINED' && styles.selectedTab,
          ]}
        >
          <Text style={styles.titleLarge}>JOINED</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'ABOUT' && <AboutScreen data={dataProfile} />}
      {selectedTab === 'CHALLENGE' && <ChallengeScreen navigation={navigation} desiredOwnerId={id_owner} />}
      {selectedTab === 'JOINED' && <JoinedScreen navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    fontSize: 26,
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
    paddingHorizontal: 20,

  },
  actionInteraction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,

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
