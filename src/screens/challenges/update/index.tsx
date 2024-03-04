import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Alert, TouchableOpacity, TextInput } from 'react-native';

import { NavigateType } from '../../../models/Navigations';
import { useOneChallenges, useUpdateChallenges } from '../../../hooks/useChallenge';
import ButtonChallenge from '../../../components/ButtonChallenge';
import { Challenge } from '../../../models/InfChallenge';
import Next from '../create/Next';
import DateTimePicker from '@react-native-community/datetimepicker';



const UpdateChallenges = ({ navigation, route }: NavigateType) => {
  const { id } = route.params;
  const { data: Challenge, mutate } = useOneChallenges(id);
  const { mutate: updateMutate } = useUpdateChallenges(id);

  const [editedChallenge, setEditedChallenge] = useState<Challenge | undefined>(Challenge);

  useEffect(() => {
    mutate();
  }, [id, mutate]);



  const handleUpdate = async () => {
    try {
      await updateMutate({
        ...Challenge,
        title,
        description,
        address,
        images_path,
        company,
        start_time,
        end_time,
        points_reward
      });


      mutate();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);




  const {
    title,
    images_path,
    description,
    points_reward,
    company,
    start_time,
    end_time,
    address
  } = Challenge || editedChallenge || {};

  const handleInputChange = (name: string, value: string) => {
    setEditedChallenge((prevState: Challenge | undefined) => {
      if (!prevState) {
        return prevState;
      }
      return {
        ...prevState,
        [name]: value,
      };
    });
  };


  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showPicker = mode => {
    setPickerMode(mode);
    setShowDatePicker(true);
  };

  const hidePicker = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const handleDateChange = (event, selectedDate) => {
    hidePicker();
    if (selectedDate !== undefined) {
      setSelectedDate(selectedDate);
      if (pickerMode === 'date') {
        setStartDate(selectedDate);
      } else if (pickerMode === 'endDate') {
        setEndDate(selectedDate);
      }
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    hidePicker();
    if (selectedDate !== undefined) {
      setSelectedDate(selectedDate);
      if (pickerMode === 'startTime') {
        setStartTime(selectedDate);
      } else if (pickerMode === 'endTime') {
        setEndTime(selectedDate);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/icons/arrow-left.png')} />
          </TouchableOpacity>
          <Text style={styles.titleLarge}>Update Challenges</Text>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
            <Image source={require('../../../assets/icons/notification.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.formBackground}>
          <View style={styles.container}>
            <View style={styles.mediaContainer}>
              <Text style={styles.titleMedium}>Attached Photos and Videos</Text>
            </View>
            <View style={styles.viewChoose}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.imageLarge} />
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
            <Text style={[styles.titleLarge, styles.titleDetail]}>Details</Text>
            <Text style={styles.titleMedium}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the challenges title"
              placeholderTextColor={'#BDBDBD'}
              defaultValue={title}
              onChangeText={(value) => handleInputChange('title', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.titleMedium}>Description</Text>
            <TextInput
              style={[styles.input, styles.inputDes]}
              placeholder="Enter the challenges description"
              placeholderTextColor={'#BDBDBD'}
              defaultValue={description}
              multiline={true}
              textAlignVertical="top"
              onChangeText={(value) => handleInputChange('description', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.titleMedium}>Points</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#BDBDBD'}
              placeholder="Enter the challenges points"
              defaultValue={`${points_reward}`}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.titleMedium}>Company</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the challenges company"
              placeholderTextColor={'#BDBDBD'}
              defaultValue={company}
            />
          </View>
        </View>

        <View style={styles.mediaContainer}>
          <Text style={styles.titleMedium}>Challenges Date, Time & Venue</Text>
        </View>

        <View style={styles.rowContainer1}>
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>Start Date</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => showPicker('date')}>
              <Text style={styles.titleSmall}>
                {new Date(start_time).toDateString()}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>End Date</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => showPicker('endDate')}>
              <Text style={styles.titleSmall}>
                {new Date(end_time).toDateString()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowContainer1}>
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>Start Time</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => showPicker('startTime')}>
              <Text style={styles.titleSmall}>
                {startTime.toTimeString().slice(0, 5)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>End Time</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => showPicker('endTime')}>
              <Text style={styles.titleSmall}>
                {endTime.toTimeString().slice(0, 5)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            onChange={
              pickerMode === 'date' || pickerMode === 'endDate'
                ? handleDateChange
                : handleTimeChange
            }
            mode={
              pickerMode === 'date' || pickerMode === 'endDate' ? 'date' : 'time'
            }
            display="default"
            onCancel={hidePicker}
            onConfirm={hidePicker}
          />
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.titleMedium}>Addreess Line</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the challenges addreess"
            placeholderTextColor="#BDBDBD"
            onChangeText={text => setChallengeAddress(text)}
            defaultValue={address}
          />
        </View>

        <View style={styles.buttonUpdate}>
          <ButtonChallenge
            onPress={handleUpdate}
            title="Update"
            buttonStyle={{ width: 120 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  formBackground: {
    top: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
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
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    color: '#363636',
    width: '100%',
  },
  inputDes: {
    height: 100,
  },
  mediaContainer: {
    marginBottom: 20,
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
    fontSize: 16,
    color: '#4F4F4F',
    fontWeight: 'bold',
  },
  titleLarge: {
    fontSize: 20,
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
  formInputTime: {
    width: 145,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    color: '#BDBDBD',
  },
  formContainerDateTime: {
    gap: 5,
  },
  buttonUpdate: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  }
});

export default UpdateChallenges;