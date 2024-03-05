import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import ButtonProfile from '../../components/ButtonProfile';
import ButtonProfile2 from '../../components/ButtonProfile2';
import HeaderProfile from '../../components/HeaderProfile';
import {NavigateType} from '../../models/Navigations';
import { DataProfile } from '../../models/Profile';

export default function SubProfileScreen({
  route,
  navigation,
}: {
  route: {params: {DATA: DataProfile}};
  navigation: NavigateType;
}) {
  const {DATA} = route.params;

  const moveEdit = () => {
    navigation.navigate('EditProfile', {DATA});
  };
  const [isModalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderProfile navigation={navigation} />
      </View>

      <View style={styles.profile}>
      <Image source={{ uri: DATA?.image }} style={styles.profileImage} />
        <Text style={styles.profileName}>{DATA.username}</Text>
        <Text style={styles.email}>{DATA.email}</Text>

        <View style={styles.numberStatus}>
          <View style={styles.itemfllowing}>
            <Text style={styles.itemNumber}>{DATA?.points}</Text>
            <Text style={styles.titleMedium}>{DATA?.challenges.length>0 ? "Points" : "Point"}</Text>
          </View>
          <View style={styles.arrowMiddle} />
          <View style={styles.itemfllower}>
            <Text style={styles.itemNumber}>{DATA?.challenges ? DATA?.challenges.length : 0}</Text>
            <Text style={styles.titleMedium}>{DATA?.challenges.length>0 ? "Challenges" : "Challenge"}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionInteraction}>
        <ButtonProfile2
          title="Edit Profile"
          icon={require('../../assets/profile/edit.png')}
          onPress={moveEdit}
        />
        <ButtonProfile
          title="Logout"
          icon={require('../../assets/profile/log_out.png')}
          onPress={toggleModal}
        />
      </View>
      <Text style={styles.titleLarge}>About me</Text>
      <Text style={styles.titleMedium}>{DATA.about_me}</Text>
      <Modal isVisible={isModalVisible}>
        <View style={styles.formBackground}>
          <Text style={styles.titleLogout}>Logout</Text>
          <Text style={styles.titleText}>Are you sure to Logout?</Text>
          <View style={styles.actionLogout}>
            <LinearGradient
              colors={['#FF0A00', '#FF890B']}
              start={{x: 0.0, y: 1.5}}
              end={{x: 1.0, y: 0.5}}
              style={styles.button}>
              <TouchableOpacity onPress={toggleModal}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#FF0A00', '#FF890B']}
              start={{x: 0.0, y: 0.5}}
              end={{x: 2.0, y: 0.5}}
              style={styles.button}>
              <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>
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
  email: {
    fontSize: 18,
    marginVertical: 8,
    color: '#120D26',
  },
  numberStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  displayRow: {
    flexDirection: 'row',
    gap: 5,
    height: 28,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 137, 11, 0.3)',
    paddingHorizontal: 10,
    borderRadius: 13,
  },
  displayRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  titleActionChange: {
    fontSize: 14,
    color: '#FF890B',
  },
  titleLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#120D26',
  },
  titleMedium: {
    fontSize: 14,
    marginBottom: 4,
    color: '#120D26',
    opacity: 0.5,
  },
  titleIntersted: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  arrowMiddle: {
    width: 1,
    height: 45,
    backgroundColor: '#120D26',
  },
  listActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionInteraction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  formBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#216C53',
    padding: 40,
    borderRadius: 20,
    gap: 10,
  },
  titleLogout: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  titleText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  actionLogout: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    height: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
