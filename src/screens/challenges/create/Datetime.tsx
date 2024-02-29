import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, PanResponder } from 'react-native';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';


const Datetime = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('20:00');
  const [datetime, setDatetime] = useState('2016-05-05 20:00');
  const [datetime1, setDatetime1] = useState('2016-05-05 20:00');

  useEffect(() => {
    const _panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {console.log('onStartShouldSetPanResponder'); return true;},
      onMoveShouldSetPanResponder: () => {console.log('onMoveShouldSetPanResponder'); return true;},
      onPanResponderGrant: () => console.log('onPanResponderGrant'),
      onPanResponderMove: () => console.log('onPanResponderMove'),
      onPanResponderRelease: () => console.log('onPanResponderRelease'),
      onPanResponderTerminate: () => console.log('onPanResponderTerminate')
    });
    // Clean up
    return () => {
      // Clean up the PanResponder if needed
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to react-native-datepicker example!</Text>
      <DatePicker
        style={{width: 200}}
        date={date}
        mode="date"
        placeholder="placeholder"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconSource={require('../assets/icons/google_calendar.png')}
        onDateChange={(date) => setDate(date)}
      />
      <Text style={styles.instructions}>date: {date}</Text>
      <DatePicker
        style={{width: 200}}
        date={time}
        mode="time"
        format="HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        minuteInterval={10}
        onDateChange={(time) => setTime(time)}
      />
      <Text style={styles.instructions}>time: {time}</Text>
      <DatePicker
        style={{width: 200}}
        date={datetime}
        mode="datetime"
        format="YYYY-MM-DD HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        onDateChange={(datetime) => setDatetime(datetime)}
      />
      <Text style={styles.instructions}>datetime: {datetime}</Text>
      <DatePicker
        style={{width: 200}}
        date={datetime1}
        mode="datetime"
        format="YYYY-MM-DD HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        minuteInterval={10}
        onDateChange={(datetime) => setDatetime1(datetime)}
      />
      <Text style={styles.instructions}>datetime: {datetime1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default Datetime;
