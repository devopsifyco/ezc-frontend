import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Next from './Next';
import { NavigateType } from '../../models/Navigations';



const UpdateChallenge: React.FC<NavigateType> = ({ navigation }) => {


  const [challengeName, setChallengeName] = useState('');
  const [challengeType, setChallengeType] = useState('');
  const [challengeMode, setChallengeMode] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [Time1, setTime1] = useState('');
  const [Time2, setTime2] = useState('');
  const [challengeAddress, setChallengeAddress] = useState('');


  const handleDateChange1 = () => {
    setDate1(date1);
  };

  const handleDateChange2 = () => {
    setDate2(date2);
  };

  const handleTimeChange1 = () => {
    setTime1(Time1);
  };

  const handleTimeChange2 = () => {
    setTime2(Time2);
  };


  const handleNotificationPress = () => {
    navigation.navigate('NotificationScreen');
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Image source={require('../../assets/icons/arrow-left.png')} />
        </TouchableOpacity>
        <Text style={[styles.titleLarge, { fontSize: 20 }]}>Update Challenges</Text>
        <TouchableOpacity onPress={handleNotificationPress}>
          <Image source={require('../../assets/icons/notification.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View>
          <View style={styles.container}>
            <View style={styles.mediaContainer}>
              <Text style={styles.titleLarge}>
                Attached Photos and Videos
              </Text>
            </View>
            <View style={styles.viewChoose}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.imageLarge}
                />
              ) : (
                <Next setSelectedImage={setSelectedImage} />
              )}
              <Text></Text>
            </View>
            <View style={styles.viewAdd}>
              <View style={styles.rowContainer}>
                {selectedImage1 ? (
                  <Image
                    source={{ uri: selectedImage1 }}
                    style={styles.imageMedium}
                  />
                ) : (
                  <Next setSelectedImage1={setSelectedImage1} />
                )}
                <Text></Text>
              </View>
              <View style={styles.rowContainer}>
                {selectedImage2 ? (
                  <Image
                    source={{ uri: selectedImage2 }}
                    style={styles.imageMedium}
                  />
                ) : (
                  <Next setSelectedImage2={setSelectedImage2} />
                )}
                <Text></Text>
              </View>
              <View style={styles.rowContainer}>
                {selectedImage3 ? (
                  <Image
                    source={{ uri: selectedImage3 }}
                    style={styles.imageMedium}
                  />
                ) : (
                  <Next setSelectedImage3={setSelectedImage3} />
                )}
                <Text></Text>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.titleLarge, styles.titleDetail]}>
              Details
            </Text>
            <Text style={styles.titleMedium}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the challenges title"
              placeholderTextColor={'#BDBDBD'}
              onChangeText={text => setChallengeName(text)}
              defaultValue={challengeName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.titleMedium}>Description</Text>
            <TextInput
              style={[styles.input, styles.inputDes]}
              placeholder="Enter the challenges description"
              placeholderTextColor={'#BDBDBD'}
              onChangeText={text => setChallengeType(text)}
              defaultValue={challengeType}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.titleMedium}>Points</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#BDBDBD'}
              placeholder="Enter the challenges points"
              onChangeText={text => setChallengeMode(text)}
              defaultValue={challengeMode}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.titleMedium}>Company</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the challenges company"
              placeholderTextColor={'#BDBDBD'}
              onChangeText={text => setChallengeMode(text)}
              defaultValue={challengeMode}
            />
          </View>
        </View>
        <View
        >
          <View>
            <View style={styles.container}>
              <View style={styles.mediaContainer}>
                <Text style={styles.titleMedium}>
                  Challenges Date, Time & Venue
                </Text>
              </View>
              <View style={styles.rowContainer1}>
                <View>
                  <Text style={styles.titleMedium}>Start Date</Text>
                  <DatePicker
                    style={styles.dayForm}
                    mode="date"
                    format="DD/MM/YYYY"
                    onDateChange={handleDateChange1}
                  />
                </View>
                <View>
                  <Text style={styles.titleMedium}>End Date</Text>
                  <DatePicker
                    style={styles.dayForm}
                    mode="date"
                    format="DD/MM/YYYY"
                    onDateChange={handleDateChange2}
                  />
                </View>
              </View>
              <View style={styles.rowContainer1}>
                <View>
                  <Text style={styles.titleMedium}>Start Time</Text>
                  <DatePicker
                    style={styles.dayForm}
                    mode="time"
                    format="HH:mm"
                    onDateChange={handleTimeChange1}
                  />
                </View>
                <View>
                  <Text style={styles.titleMedium}>End Time</Text>
                  <DatePicker
                    style={styles.dayForm}
                    mode="time"
                    format="HH:mm"
                    onDateChange={handleTimeChange2}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.titleMedium}>Addreess Line</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Address Line"
                  onChangeText={text => setChallengeAddress(text)}
                  defaultValue={challengeAddress}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}


export default UpdateChallenge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#363636',
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 20,
    gap: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    color: '#363636',
    width: '100%',
  },
  inputDes: {
    height: 100,
  },
  mediaContainer: {
    marginBottom: 8,
  },
  viewChoose: {
    width: 320,
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'dotted',
    marginBottom: 5,
  },

  button: {
    borderRadius: 25,
    width: '48%',
  },
  gradient: {
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  viewStatus: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  status: {
    backgroundColor: '#216C53',
    padding: 10,
    width: 42,
    height: 42,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'red',
    width: '100%',
  },
  viewAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    width: 103,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'dotted',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titleSmall: {
    fontSize: 14,
    color: '#4F4F4F',
  },
  titleMedium: {
    fontSize: 14,
    color: '#4F4F4F',
  },
  titleLarge: {
    fontSize: 16,
    color: '#4F4F4F',
    fontWeight: 'bold',
  },
  titleDetail: {
    paddingTop: 10,
  },
  displayCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  imageLarge: { width: 320, height: 220 },
  imageMedium: { width: 102, height: 100 },
  actions: {
    flexDirection: 'row',
    gap: 20,
  },
  textStep: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonStep: {
    backgroundColor: '#FF0A00',
    width: 120,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
  },
  dayForm: {
    width: 150,
  },
})

export { styles };  