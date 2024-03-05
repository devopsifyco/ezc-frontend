import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import Button from '../../../components/Button';
import {styles} from '.';
import useChallengeCreate from '../../../hooks/useChallengeCreate';
import * as Progress from 'react-native-progress';

type Input = {
  startDate: Date;
  endDate: Date;
  startTime?: Date;
  endTime?: Date;
  address: string;
};

const useCombinedData = () => {
  const route = useRoute();
  const dataFromStepOne = route.params?.dataFromStepOne || {};
  return dataFromStepOne;
};

const timeString = (time: Date | undefined) => {
  if (!time) return 'HH:MM';

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

const dateString = (date: Date | undefined) => {
  if (!date) return 'MM/DD/YYYY';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

const StepTwoScreen = () => {
  const dataFromStepOne = useCombinedData();
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<
    'startDate' | 'endDate' | 'startTime' | 'endTime'
  >('startDate');

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<Input>({
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      startTime: undefined,
      endTime: undefined,
      address: '',
    },
  });

  const showPicker = (
    mode: 'startDate' | 'endDate' | 'startTime' | 'endTime',
  ) => {
    setPickerMode(mode);
    setShowDatePicker(true);
    setShowTimePicker(mode === 'startTime' || mode === 'endTime');
  };

  const hidePicker = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const handleDateChange = ({selectedDate}: any) => {
    hidePicker();
    if (pickerMode === 'startDate') {
      setStartDate(selectedDate || new Date());
      setValue('startDate', selectedDate || new Date());
    } else if (pickerMode === 'endDate') {
      setEndDate(selectedDate || new Date());
      setValue('endDate', selectedDate || new Date());
    }
  };

  const handleTimeChange = ({selectedTime}: any) => {
    hidePicker();
    if (pickerMode === 'startTime') {
      setStartTime(selectedTime || new Date());
      setValue('startTime', selectedTime || new Date());
    } else if (pickerMode === 'endTime') {
      setEndTime(selectedTime || new Date());
      setValue('endTime', selectedTime || new Date());
    }
  };

  const validateStartDate = (value: Date) => {
    const currentTime = new Date();
    const minStartDate = new Date(
      currentTime.getTime() + 3 * 24 * 60 * 60 * 1000,
    );
    return value >= minStartDate || 'At least 3 days from today!';
  };

  const validateEndDate = (value: Date) => {
    if (startDate !== undefined) {
      const minEndDate = new Date(
        startDate.getTime() + 7 * 24 * 60 * 60 * 1000,
      );
      return value >= minEndDate || 'At least 7 days from start!';
    }
    return ' *';
  };

  const backScreen = () => {
    navigation.navigate('CreateChallenges', {step: 1});
  };

  const {mutate: challengeCreate, isPending} = useChallengeCreate();

  const onSubmit: SubmitHandler<Input> = data => {
    const combinedData = {...dataFromStepOne, ...data};

    if (data.startDate && data.startTime) {
      const start_time = new Date(
        data.startDate.getFullYear(),
        data.startDate.getMonth(),
        data.startDate.getDate(),
        data.startTime.getHours(),
        data.startTime.getMinutes(),
      );
      start_time.setTime(
        start_time.getTime() - start_time.getTimezoneOffset() * 60 * 1000,
      );
      combinedData.start_time = start_time;
    }

    if (data.endDate && data.endTime) {
      const end_time = new Date(
        data.endDate.getFullYear(),
        data.endDate.getMonth(),
        data.endDate.getDate(),
        data.endTime.getHours(),
        data.endTime.getMinutes(),
      );
      end_time.setTime(
        end_time.getTime() - end_time.getTimezoneOffset() * 60 * 1000,
      );

      combinedData.end_time = end_time;
    }

    delete combinedData.startDate;
    delete combinedData.startTime;
    delete combinedData.endDate;
    delete combinedData.endTime;

    console.log(combinedData);

    try {
      challengeCreate(combinedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {isPending && (
        <View style={styles.displayLoading}>
          <Progress.CircleSnail color={'white'} size={65} />
        </View>
      )}
      <View style={styles.mediaContainer}>
        <Text style={styles.titleMedium}>Challenges Date, Time & Venue</Text>
      </View>

      <Controller
        control={control}
        render={() => (
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>Start Date</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => showPicker('startDate')}>
              <Text style={styles.titleSmall}>{dateString(startDate)}</Text>
            </TouchableOpacity>
            {errors.startDate && (
              <Text style={styles.errorText}>{errors.startDate.message}</Text>
            )}
          </View>
        )}
        name="startDate"
        rules={{validate: validateStartDate}}
      />

      <Controller
        control={control}
        render={() => (
          <View style={styles.formContainerDateTime}>
            <Text style={styles.titleMedium}>End Date</Text>
            <TouchableOpacity
              style={styles.formInputTime}
              onPress={() => showPicker('endDate')}>
              <Text style={styles.titleSmall}>{dateString(endDate)}</Text>
            </TouchableOpacity>
            {errors.endDate && (
              <Text style={styles.errorText}>{errors.endDate?.message}</Text>
            )}
          </View>
        )}
        name="endDate"
        rules={{validate: validateEndDate}}
      />

      {showDatePicker &&
        (pickerMode === 'startDate' || pickerMode === 'endDate') && (
          <DateTimePicker
            value={
              (pickerMode === 'startDate' ? startDate : endDate) || new Date()
            }
            onChange={(_event, selectedDate) => {
              handleDateChange({selectedDate});
            }}
            mode="date"
            display="default"
            onCancel={hidePicker}
            onConfirm={hidePicker}
          />
        )}

      <View style={styles.formContainerDateTime}>
        <Text style={styles.titleMedium}>Start Time</Text>
        <TouchableOpacity
          style={styles.formInputTime}
          onPress={() => showPicker('startTime')}>
          <Text style={styles.titleSmall}>{timeString(startTime)}</Text>
        </TouchableOpacity>
        {errors.startTime && (
          <Text style={styles.errorText}>{errors.startTime.message}</Text>
        )}
      </View>
      <View style={styles.formContainerDateTime}>
        <Text style={styles.titleMedium}>End Time</Text>
        <TouchableOpacity
          style={styles.formInputTime}
          onPress={() => showPicker('endTime')}>
          <Text style={styles.titleSmall}>{timeString(endTime)}</Text>
        </TouchableOpacity>
        {errors.endTime && (
          <Text style={styles.errorText}>{errors.endTime.message}</Text>
        )}
      </View>

      {showTimePicker &&
        (pickerMode === 'startTime' || pickerMode === 'endTime') && (
          <DateTimePicker
            value={
              (pickerMode === 'startTime' ? startTime : endTime) || new Date()
            }
            onChange={(_event, selectedTime) => {
              handleTimeChange({selectedTime});
            }}
            mode="time"
            display="default"
            onCancel={hidePicker}
            onConfirm={hidePicker}
          />
        )}

      <View style={styles.inputContainer}>
        <View style={styles.displayError}>
          <Text style={styles.titleMedium}>Address</Text>
          {errors.address && (
            <Text style={styles.errorText}>{errors.address.message}</Text>
          )}
        </View>

        <Controller
          control={control}
          render={({field}) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter the challenges address"
                placeholderTextColor="#BDBDBD"
                onChangeText={text => field.onChange(text)}
                value={field.value}
              />
            </>
          )}
          name="address"
          defaultValue=""
          rules={{required: ' *'}}
        />
      </View>
      <View style={styles.actionButton}>
        <View style={styles.button}>
          <Button title="Back" onPress={backScreen} />
        </View>
        <View style={styles.button}>
          <Button title="Create" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
};

export default StepTwoScreen;
