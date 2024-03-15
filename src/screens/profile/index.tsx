import React, { useState } from 'react';
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

export default function ProfileScreen({ navigation }: NavigateType) {
  const [selectedTab, setSelectedTab] = useState('ABOUT');
  const { data: dataProfile, isLoading } = useProfile();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderProfile navigation={navigation} />
        <TouchableOpacity
          onPress={() => navigation.navigate('SubProfileScreen', { dataProfile })}>
          <Image source={require('../../assets/profile/menu-toggle.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <Image
          source={{ uri: dataProfile?.avatar.name }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{dataProfile?.username}</Text>
        <Text style={styles.profileName}>{dataProfile?.email}</Text>
        <View style={styles.numberStatus}>
          <View style={styles.itemfllowing}>
            <Text style={styles.itemNumber}>{dataProfile?.points}</Text>
            <Text style={styles.titleMedium}>Points</Text>
          </View>
          <View style={styles.arrowMiddle} />
          <View style={styles.itemfllower}>
            <Text style={styles.itemNumber}>{dataProfile?.challenges ? dataProfile?.challenges.length : 0}</Text>
            <Text style={styles.titleMedium}>Challenge</Text>
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
      </View>

      {selectedTab === 'ABOUT' && <AboutScreen data={dataProfile} />}
      {selectedTab === 'CHALLENGE' && <ChallengeScreen navigation={navigation} />}
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
