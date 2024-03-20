import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { View, Text, ScrollView, StyleSheet, Image, Alert, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { NavigateType } from '../../../models/Navigations';
import { useOneChallenges, useUpdateChallenges } from '../../../hooks/useChallenge';
import ButtonChallenge from '../../../components/ButtonChallenge';
import { Challenge } from '../../../models/InfChallenge';
import { styles } from './style';
import SelectedImages from './ImageUpdate';
import { Asset } from 'react-native-image-picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface ImageData {
  fileName: string;
  base64: string;
}

const timeString = (time: Date | string | undefined) => {
  if (!time) return 'HH:MM';

  const timeObject = typeof time === 'string' ? new Date(time) : time;
  
  const hours = timeObject.getHours().toString().padStart(2, '0');
  const minutes = timeObject.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};



const dateString = (dateString: string | undefined) => {
  if (!dateString) return 'MM/DD/YYYY';

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};


const UpdateChallenges = ({ navigation, route }: NavigateType) => {
  const { id } = route.params;
  const { data: Challenge } = useOneChallenges(id);
  const { mutate: updateMutate } = useUpdateChallenges();

  const [editedChallenge, setEditedChallenge] = useState<Challenge>(Challenge);

  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);




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


  const handleUpdate = async () => {
    try {
      if (editedChallenge) {
        await updateMutate({
          ...editedChallenge,
          id,
          images_path: selectedImages
        });
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleImagesSelected = async (images: Asset[] | undefined) => {
    try {
      const imageDatas: any = images?.map(asset => ({
        fileName: asset.fileName ?? '',
        base64: asset.base64 ?? '',
      })) ?? [];
      console.log("image Da ta", imageDatas)
      setSelectedImages(imageDatas)

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


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



  const [startTime, setStartTime] = useState<Date>(new Date(start_time));
  const [endTime, setEndTime] = useState<Date>(new Date(end_time));
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
                  initialImageURL={images_path}
                  onImagesSelected={handleImagesSelected}
                  clearImages={() => setValue('images_path', [])}
                />
              )}
              name="images_path"
              defaultValue={[]}
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
              <Text style={styles.titleSmall}>{dateString(start_time)}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>End Date</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => showPicker('endDate')}>
              <Text style={styles.titleSmall}>{dateString(end_time)} </Text>
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
              <Text style={styles.titleSmall}>{timeString(start_time)}</Text>
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
              <Text style={styles.titleSmall}>{timeString(end_time)}</Text>
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
            onPress={handleSubmit(handleUpdate)}
            title="Update"
            buttonStyle={{ width: 120 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateChallenges;