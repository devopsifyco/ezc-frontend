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
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalPoup from '../../../components/ModalPoup';
import { useQueryClient } from '@tanstack/react-query';

interface ImageData {
  fileName: string;
  base64: string;
}

const timeString = (time: Date | string | undefined) => {
  if (!time) return 'HH:MM';

  const timeObject = typeof time === 'string' ? new Date(time) : time;

  const hours = timeObject.getUTCHours().toString().padStart(2, '0');
  const minutes = timeObject.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};


const dateString = (date: Date | undefined) => {
  if (!date) return 'MM/DD/YYYY';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};



const UpdateChallenges = ({ navigation, route }: NavigateType) => {
  const { id } = route.params;
  const queryClient = useQueryClient();

  const { data: Challenge } = useOneChallenges(id);
  const { mutate: updateMutate } = useUpdateChallenges();

  const [editedChallenge, setEditedChallenge] = useState<Challenge>(Challenge);

  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);

  // hadle modal pop-up
  const [visible, setVisible] = useState(false);





  const {
    title,
    images_path,
    description,
    points_reward,
    company,
    start_time,
    end_time,
    address
  } = Challenge ? Challenge : editedChallenge || {};


  const handleUpdate = async () => {
    try {
      if (editedChallenge && startTime) {
        const combinedStartTime = combineDateTime(startTime, startTime);
        const combinedEndTime = combineDateTime(endTime, endTime);
        const startTimeAsDate = new Date(combinedStartTime);
        const endTimeAsDate = new Date(combinedEndTime);
        await updateMutate({
          ...editedChallenge,
          id,
          images_path: selectedImages,
          start_time: startTimeAsDate,
          end_time: endTimeAsDate,
        }, {
          onSuccess:
            () => {
              setVisible(true);
            }
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




  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'startDate' | 'endDate' | 'startTime' | 'endTime'>('startDate');


  const defaultStartDate = new Date(start_time || new Date());

  const defaultEndDate = new Date(end_time || new Date());
  const [startTime, setStartTime] = useState<Date>(defaultStartDate);
  const [endTime, setEndTime] = useState<Date>(defaultEndDate);


  const showPicker = (mode: 'startDate' | 'endDate' | 'startTime' | 'endTime') => {
    setPickerMode(mode);
    setShowDatePicker(true);
  };

  const hidePicker = () => {
    setShowDatePicker(false);
  };


  const handleDateChange = (selectedDate?: Date) => {
    hidePicker();
    if (selectedDate !== undefined) {
      if (pickerMode === 'startDate') {
        setStartTime(selectedDate);
      } else if (pickerMode === 'endDate') {
        setEndTime(selectedDate);
      }
    }
  };

  const handleTimeChange = (selectedDate?: Date) => {
    hidePicker();
    if (selectedDate !== undefined) {
      if (pickerMode === 'startTime') {
        setStartTime(selectedDate);
      } else if (pickerMode === 'endTime') {
        setEndTime(selectedDate);
      }
    }
  };

  const combineDateTime = (date: Date, time: Date) => {
    const combinedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
    );

    return combinedDate.toISOString();
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
              onPress={() => showPicker('startDate')}>
              <Text style={styles.titleSmall}>{dateString(startTime)}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>End Date</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => showPicker('endDate')}>
              <Text style={styles.titleSmall}>{dateString(endTime)} </Text>
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
              <Text style={styles.titleSmall}>{timeString(startTime)}</Text>
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
              <Text style={styles.titleSmall}>{timeString(endTime)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={pickerMode === 'startDate' || pickerMode === 'endDate' ? startTime : endTime}
            onChange={(event, selectedDate) => {
              if (selectedDate !== undefined) {
                if (pickerMode === 'startDate' || pickerMode === 'endDate') {
                  handleDateChange(selectedDate);
                } else {
                  handleTimeChange(selectedDate);
                }
              }
            }}
            mode={pickerMode === 'startDate' || pickerMode === 'endDate' ? 'date' : 'time'}
            display="default"
            onCancel={hidePicker}
            onConfirm={hidePicker}
            timeZoneOffsetInMinutes={0}
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
      <ModalPoup visible={visible}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../../assets/images/successful.png')} style={{ width: 150, height: 150 }} />
        </View>
        <Text style={{ marginTop: 20, fontSize: 20, textAlign: 'center', color: '#000000', fontWeight: '600' }}>
          Update challenge successful
        </Text>
        <Text style={{ textAlign: 'center', paddingHorizontal: 10, fontSize: 13 }}>
          Update challenge successfully.{'\n'}Thanks for choosing us.
        </Text>
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <ButtonChallenge
            buttonStyle={{ width: '100%', borderRadius: 50 }}
            title='Back to Home'
            onPress={() => navigation.navigate('EZChallenge')}
            textStyle={{ fontSize: 20 }}
          />
        </View>
      </ModalPoup>
    </View>
  );
};

export default UpdateChallenges;