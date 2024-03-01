import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '.';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function StepTwoScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [challengeAddress1, setChallengeAddress1] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
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
      <View style={styles.mediaContainer}>
        <Text style={styles.titleMedium}>Challenges Date, Time & Venue</Text>
      </View>
      <View style={styles.rowContainer1}>
        <View style={styles.formContainerDateTime}>
          <Text style={styles.titleMedium}>Start Date</Text>
          <TouchableOpacity
            style={styles.formInputTime}
            onPress={() => showPicker('date')}>
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
        <Text style={styles.titleMedium}>Addreess Line 1</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the challenges addreess"
          placeholderTextColor="#BDBDBD"
          onChangeText={text => setChallengeAddress1(text)}
          defaultValue={challengeAddress1}
        />
      </View>
    </View>
  );
}
