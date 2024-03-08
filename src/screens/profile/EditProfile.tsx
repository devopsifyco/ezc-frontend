import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useUpdateUserProfile } from '../../hooks/useUser';
import { DataProfile } from '../../models/Profile';
import { NavigateType } from '../../models/Navigations';

export default function EditProfile({
  route,
  navigation,
}: {
  route: { params: { DATA: DataProfile } };
  navigation: NavigateType;
}) {
  const { DATA } = route.params;

  const [newData, setNewData] = useState({
    username: DATA.username,
    location: DATA.location,
    about_me: DATA.about_me,
    email: DATA.email,
    image: DATA.avatar.name || '',
  });
  const { mutate, isPending } = useUpdateUserProfile();

  const handleImagePicker = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {

      if (response.assets && response.assets.length > 0) {
        const selectedUri = response.assets[0].uri;
        setNewData((prev) => ({ ...prev, image: selectedUri }));
      } else {
        console.log('User cancelled image picker or there was an error');
      }
    });
  };

  const handleUpdate = async () => {
    
    try {
      await mutate(newData);
        Alert.alert('Edit Prodile successfully')
       navigation.goBack();
    } catch (error) {
      console.error('Update failed', error);
      Alert.alert('Error', 'Failed to update user profile');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formInput}>
        <View style={styles.displayCenter}>
          <Image source={{ uri: newData.image || DATA?.avatar.name }} style={styles.profileImage} />
          <TouchableOpacity onPress={handleImagePicker}>
            <Image
              source={require('../../assets/icons/edit-profile.png')}
              style={styles.iconEdit}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>Email</Text>
          <TextInput
            style={styles.input}
            value={newData.email}
            onChangeText={(text) => setNewData((prev) => ({ ...prev, email: text }))}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>User name</Text>
          <TextInput
            style={styles.input}
            value={newData.username}
            onChangeText={(text) => setNewData((prev) => ({ ...prev, username: text }))}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>Location</Text>
          <TextInput
            style={styles.input}
            value={newData.location}
            onChangeText={(text) => setNewData((prev) => ({ ...prev, location: text }))}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>About me</Text>
          <TextInput
            style={styles.input}
            value={newData.about_me}
            onChangeText={(text) => setNewData((prev) => ({ ...prev, about_me: text }))}
            multiline
          />
        </View>
        <View style={styles.displayCenter}>
          <LinearGradient
            colors={['#FF0A00', '#FF890B']}
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 2.0, y: 0.5 }}
            style={styles.button}
          >
            <TouchableOpacity onPress={handleUpdate}>
              {isPending ? (
                <View style={styles.displayLoading}>
                  <ActivityIndicator color="#fff" />
                </View>
              ) : (
                <Text style={styles.textButton}>Update</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  displayLoading: {
    backgroundColor: 'grey',
    position: 'absolute',
    opacity: 0.5,
  },
  formInput: {
    flex: 1,
    justifyContent: 'center',
  },
  containerInput: {
    marginVertical: 10,
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    height: 'auto',
    paddingHorizontal: 10,
    color: '#000000',
  },
  textInput: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 100,
    alignItems: 'center',
  },
  textButton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconEdit: {
    marginLeft: 50,
    marginTop: -20
  },
  displayCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
