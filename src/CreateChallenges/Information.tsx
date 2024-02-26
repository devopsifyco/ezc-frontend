import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import DatePicker from 'react-native-datepicker';
import LinearGradient from 'react-native-linear-gradient';
import Next from './Next';


const CreateChallenges = () => {
  const [challengeName, setChallengeName] = useState('');
  const [challengeType, setChallengeType] = useState('');
  const [challengeMode, setChallengeMode] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [date1, setDate1] = useState('2022-04-17');
  const [date2, setDate2] = useState('2022-04-17');
  const [Time1, setTime1] = useState('00:00');
  const [Time2, setTime2] = useState('00:00');
  const [challengeAddress1, setChallengeAddress1] = useState('');
  const [challengeAddress2, setChallengeAddress2] = useState('');
  const [challengeCity, setChallengeCity] = useState('');
  const [challengeCountry, setChallengeCountry] = useState('');

  const handleDateChange1 = (newDate: string) => {
    setDate1(newDate);
  };

  const handleDateChange2 = (newDate: string) => {
    setDate2(newDate);
  };

  const handleTimeChange1 = (newTime: string) => {
    setTime1(newTime);
  };

  const handleTimeChange2 = (newTime: string) => {
    setTime2(newTime);
  };


  const handlePress = () => {
    // Xử lý onPress
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/icons/home.png')} />
        <Text style={styles.titles}>Create Challenges</Text>
        <Image source={require('../assets/icons/notifications.png')} />
      </View>
        <View style={{ flex: 1 }}>
        <ProgressSteps>
          <ProgressStep 
          label="First Step" 
          nextBtnText="Next" 
          nextBtnStyle={{ backgroundColor: '#FF0A00' }} 
          nextBtnTextStyle={{ color: 'while' }} >
              <View style={{ alignItems: 'center' }}>
                <View>
                  <View style={styles.container}>
                    <View style={styles.mediaContainer}>
                      <Text style={styles.mediaLabel}>Attached Photos and Videos:</Text>
                    </View>
                    <View style={styles.viewChoose}>
                    {selectedImage ? ( 
                        <Image source={{ uri: selectedImage }} style={{ width: 320, height: 220 }} />
                      ) : (
                        <Next setSelectedImage={setSelectedImage} /> 
                      )}
                      <Text></Text>
                    </View>
                    <View style={styles.viewAdd}>
                      <View style={styles.rowContainer}>
                      {selectedImage1 ? ( 
                        <Image source={{ uri: selectedImage1 }} style={{ width: 102, height: 100 }} />
                      ) : (
                        <Next setSelectedImage1={setSelectedImage1} /> 
                      )}
                        <Text></Text>
                      </View>
                      <View style={styles.rowContainer}>
                      {selectedImage2 ? ( 
                        <Image source={{ uri: selectedImage2 }} style={{ width: 102, height: 100 }} />
                      ) : (
                        <Next setSelectedImage2={setSelectedImage2} /> 
                      )}
                        <Text></Text>
                      </View>
                      <View style={styles.rowContainer}>
                      {selectedImage3 ? ( 
                        <Image source={{ uri: selectedImage3 }} style={{ width: 102, height: 100 }} />
                      ) : (
                        <Next setSelectedImage3={setSelectedImage3} />
                      )}
                        <Text></Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.details}>Details:</Text>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter the challenges name"
                      onChangeText={text => setChallengeName(text)}
                      defaultValue={challengeName}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Type:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter the challenges type"
                      onChangeText={text => setChallengeType(text)}
                      defaultValue={challengeType}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mode:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter the challenges mode"
                      onChangeText={text => setChallengeMode(text)}
                      defaultValue={challengeMode}
                    />
                  </View>
                </View>
              </View>
            </ProgressStep>
            <ProgressStep label="Second Step" nextBtnText="Next" previousBtnText="Back" nextBtnStyle={{ backgroundColor: 'blue' }} nextBtnTextStyle={{ color: 'white' }} previousBtnStyle={{ backgroundColor: 'green' }} previousBtnTextStyle={{ color: 'white' }}>
              <View style={{ alignItems: 'center' }}>
              <View>
              <View style={styles.container}>
                    <View style={styles.mediaContainer}>
                      <Text style={styles.mediaLabel}>Challenges Date, Time & Venue:</Text>
                    </View>
                    <View style={styles.rowContainer1}>
                    <View>
                    <Text style={styles.label}>Start Date:</Text>
                      <DatePicker
                        style={{ width: 170 }}
                        mode="date"
                        format="DD/MM/YYYY"
                        onDateChange={handleDateChange1}
                      />

                    </View>
                    <View>
                    <Text style={styles.label}>End Date:</Text>
                      <DatePicker
                        style={{ width: 170 }}
                        mode="date"
                        format="DD/MM/YYYY"
                        onDateChange={handleDateChange2}
                      />
                    </View>
                    </View>
                    <View style={styles.rowContainer1}>
                    <View>
                        <Text style={styles.label}>Start Time:</Text>
                        <DatePicker
                        style={{ width: 170 }}
                        mode="time"
                        format="HH:mm"
                        onDateChange={handleTimeChange1}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>End Time:</Text>
                        <DatePicker
                        
                        style={{width: 170 }}
                        mode="time" 
                        format="HH:mm" 
                        onDateChange={handleTimeChange2}
                        />
                    </View>    
                    </View>
                    <View style={styles.inputContainer}>
                    <Text style={styles.label}>Addreess Line 1:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Address Line 1"
                        onChangeText={text => setChallengeAddress1(text)}
                        defaultValue={challengeAddress1}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                    <Text style={styles.label}>Addreess Line 2:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Address Line 2"
                        onChangeText={text => setChallengeAddress2(text)}
                        defaultValue={challengeAddress2}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>City:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="City"
                        onChangeText={text => setChallengeCity(text)}
                        defaultValue={challengeCity}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Country:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Country"
                        onChangeText={text => setChallengeCountry(text)}
                        defaultValue={challengeCountry}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ProgressStep>
            <ProgressStep label="Done" previousBtnText="Back">
              <View style={{ alignItems: 'center' }}>
                
              <View style={styles.Done}>


                      <Text>alo</Text>
                    </View>
              <View>
                </View>
              </View>
              </ProgressStep>
        </ProgressSteps>
      </View>
    </ScrollView>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  titles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#363636',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 50,
  },
  formContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#363636',
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    width: 150,
    height: 30,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
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
  },
  mediaContainer: {
    marginBottom: 20,
  },
  mediaLabel: {
    fontSize: 16,
    fontWeight: 'bold',
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
  viewAdd:{
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
  }
});

export default CreateChallenges;


