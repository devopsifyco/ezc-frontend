import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {styles} from '.';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';

const StepTwoScreen = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<
    'date' | 'endDate' | 'startTime' | 'endTime'
  >('date');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
    },
  });

  const showPicker = (mode: 'date' | 'endDate' | 'startTime' | 'endTime') => {
    setPickerMode(mode);
    setShowDatePicker(true);
  };

  const hidePicker = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const handleTimeChange = (event, selectedDate) => {
    hidePicker();
    if (selectedDate !== undefined) {
      setPickerMode(null);
      if (pickerMode === 'startTime') {
        setStartTime(selectedDate);
        setValue('startTime', selectedDate);
      } else if (pickerMode === 'endTime') {
        setEndTime(selectedDate);
        setValue('endTime', selectedDate);
      }
    }
  };

  const validate = async values => {
    const errors = {};

    // Add your validation logic here
    const startDate = new Date(values.startDate);
    const endDate = new Date(values.endDate);
    const startTime = new Date(values.startTime);
    const endTime = new Date(values.endTime);

    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    const threeDaysLater = new Date();
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);

    if (endDate < oneWeekLater) {
      errors.endDate = 'End date must be at least 1 week from today.';
    }

    if (startDate < threeDaysLater) {
      errors.startDate = 'Start date must be at least 3 days from today.';
    }

    if (endTime <= startTime) {
      errors.endTime = 'End time must be after start time.';
    }

    return errors;
  };
  const backScreen = () => {
    navigation.navigate('CreateChallenges', {step: 1});
  };

  const onSubmit = data => {
    navigation.navigate('CreateChallenges', {
      step: 3,
      dataFromStepOne: data,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        <Text style={styles.titleMedium}>Challenges Date, Time & Venue</Text>
      </View>
      <View style={styles.rowContainer1}>
        <View style={styles.formContainerDateTime}>
          <Text style={styles.titleMedium}>Start Date</Text>
          <TouchableOpacity
            style={styles.formInputTime}
            onPress={() => showPicker('startDate')}>
            <Text style={styles.titleSmall}>{startDate.toDateString()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainerDateTime}>
          <Text style={styles.titleMedium}>End Date</Text>
          <TouchableOpacity
            style={styles.formInputTime}
            onPress={() => showPicker('endDate')}>
            <Text style={styles.titleSmall}>{endDate.toDateString()}</Text>
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
          value={pickerMode === 'startDate' ? startDate : endDate}
          onChange={handleDateChange}
          mode="date"
          display="default"
          onCancel={hidePicker}
          onConfirm={hidePicker}
        />
      )}
      <View style={styles.inputContainer}>
        <View style={styles.displayError}>
          <Text style={styles.titleMedium}>Address</Text>
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}
        </View>
        <Controller
          control={control}
          render={({field}) => (
            <TextInput
              style={styles.input}
              placeholder="Enter the challenges address"
              placeholderTextColor="#BDBDBD"
              onChangeText={text => field.onChange(text)}
              value={field.value}
            />
          )}
          name="address"
          defaultValue=""
          rules={{required: 'is required *'}}
        />
      </View>
      <View style={styles.actionButton}>
        <View style={styles.button}>
          <Button title="Back" onPress={backScreen} />
        </View>
        <View style={styles.button}>
          <Button title="Next" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
};

export default StepTwoScreen;
