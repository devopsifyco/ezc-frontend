import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {DataPropsType} from './ProfileScreen';

export default function EditProfile({
  route,
}: {
  route: {params: {DATA: DataPropsType}};
}) {
  const {DATA} = route.params;
  const [newValues, setNewValues] = useState({...DATA});

  const handleUpdate = () => {
    console.log('Update:', newValues);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formInput}>
        <View style={styles.displayCenter}>
          <Image source={DATA.image} style={styles.profileImage} />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>User name</Text>
          <TextInput
            style={styles.input}
            value={newValues.name}
            onChangeText={text =>
              setNewValues(prev => ({...prev, userName: text}))
            }
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>Location</Text>
          <TextInput
            style={styles.input}
            value={newValues.location}
            onChangeText={text =>
              setNewValues(prev => ({...prev, location: text}))
            }
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>About me</Text>
          <TextInput
            style={styles.input}
            value={newValues.title}
            onChangeText={text =>
              setNewValues(prev => ({...prev, aboutMe: text}))
            }
            multiline
          />
        </View>
        <View style={styles.displayCenter}>
          <LinearGradient
            colors={['#FF0A00', '#FF890B']}
            start={{x: 0.0, y: 0.5}}
            end={{x: 2.0, y: 0.5}}
            style={styles.button}>
            <TouchableOpacity onPress={handleUpdate}>
              <Text style={styles.textButton}>Update</Text>
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
    borderColor: '#000',
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
  displayCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
