import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { View, Text, ScrollView, StyleSheet, Image, Alert, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { NavigateType } from '../../../models/Navigations';
import { useOneChallenges, useUpdateChallenges } from '../../../hooks/useChallenge';
import ButtonChallenge from '../../../components/ButtonChallenge';
import { Challenge } from '../../../models/InfChallenge';
import SelectedImages from './ImageUpdate';


import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const UpdateChallenges = ({ navigation, route }: NavigateType) => {
  const { id } = route.params;
  const { data: Challenge, mutate } = useOneChallenges(id);
  const { mutate: updateMutate } = useUpdateChallenges();

  const [editedChallenge, setEditedChallenge] = useState<Challenge>(Challenge);

  useEffect(() => {
    mutate();
  }, [id, mutate]);


  const handleUpdate = async () => {
    try {
      if (editedChallenge) {
        await updateMutate({
          ...editedChallenge,
          id,
        });

        mutate();
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

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
    setEditedChallenge((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

    console.log("Updated Challenge:", editedChallenge);
  };


  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    
  } = useForm<Challenge>({});

  const selectedImages = watch('images_path');

  const validateImages = (value: { name: string; downloadLink: string }[]) => {
    return value.length > 0 || ' *';
  };


  const [startTime, setStartTime] = useState<Date>(new Date(start_time || 0));
  const [endTime, setEndTime] = useState<Date>(new Date(end_time || 0));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'endDate' | 'startTime' | 'endTime'>('date');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());


  const showPicker = (mode: 'date' | 'endDate' | 'startTime' | 'endTime') => {
    setPickerMode(mode);
    setShowDatePicker(true);
  };

  const hidePicker = () => {
    setShowDatePicker(false);
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    hidePicker();
    if (selectedDate !== undefined) {
      if (pickerMode === 'date') {
        handleInputChange('start_time', selectedDate.toISOString());
      } else if (pickerMode === 'endDate') {
        handleInputChange('end_time', selectedDate.toISOString());
      }
    }
  };


  const handleTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    hidePicker();
    if (selectedDate !== undefined) {
      setSelectedDate(selectedDate);
      let updatedTime = selectedDate.toISOString().split('T')[1];
      if (pickerMode === 'startTime') {
        handleInputChange('start_time', `${start_time.split('T')[0]}T${updatedTime}`);
      } else if (pickerMode === 'endTime') {
        handleInputChange('end_time', `${end_time.split('T')[0]}T${updatedTime}`);
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
            <Controller
              control={control}
              render={({ field }) => (
                <SelectedImages
                  imageList={images_path}
                  setSelectedImage={(index: number, uri: string) => {
                    const updatedImages = [...selectedImages];
                    updatedImages[index] = { name: 'NewName', downloadLink: uri };
                    setValue('images_path', updatedImages);
                  }}
                  removeImage={(index: number) => {
                    const updatedImages = [...selectedImages];
                    updatedImages.splice(index, 1);
                    setValue('images_path', updatedImages);
                  }}
                  clearImages={() => setValue('images_path', [])}
                  loadingComponent={<ActivityIndicator />} 
                />
              )}
              name="images_path"
              defaultValue={[]}
              rules={{ validate: validateImages }}
            />
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
              onChangeText={(value) => handleInputChange('points_reward', value)}

            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.titleMedium}>Company</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the challenges company"
              placeholderTextColor={'#BDBDBD'}
              defaultValue={company}
              onChangeText={(value) => handleInputChange('company', value)}
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
                {new Date(editedChallenge?.start_time || start_time).toDateString()}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>End Date</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => showPicker('endDate')}>
              <Text style={styles.titleSmall}>
                {new Date(editedChallenge?.end_time || end_time).toDateString()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ---------------Time---------- */}
        <View style={styles.rowContainer1}>
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>Start Time</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => {
                console.log('Showing Start Time picker');
                showPicker('startTime');
              }}>
              <Text style={styles.titleSmall}>
                {new Date(editedChallenge?.start_time || startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false, // Use 24-hour format
                  timeZone: 'Asia/Ho_Chi_Minh', // Set the time zone to Vietnam
                })}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>End Time</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => {
                console.log('Showing End Time picker');
                showPicker('endTime');
              }}>
              <Text style={styles.titleSmall}>
                {new Date(editedChallenge?.start_time || startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false, // Use 24-hour format
                  timeZone: 'Asia/Ho_Chi_Minh', // Set the time zone to Vietnam
                })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            onChange={pickerMode === 'date' || pickerMode === 'endDate' ? handleDateChange : handleTimeChange}
            mode={pickerMode === 'date' || pickerMode === 'endDate' ? 'date' : 'time'}
            display="default"
            onCancel={() => hidePicker()}
            onConfirm={() => hidePicker()}
          />
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.titleMedium}>Addreess Line</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the challenges addreess"
            placeholderTextColor="#BDBDBD"
            onChangeText={(value) => handleInputChange('address', value)}
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
    marginVertical: 20
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