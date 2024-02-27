import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

export default function DatePickerValue() {
  const [date1, setDate1] = useState('2022-04-17');
  const [date2, setDate2] = useState('2022-04-17');
  const [Time1, setTime1] = useState('00:00');
  const [Time2, setTime2] = useState('00:00');
  const [challengeName, setChallengeName] = useState('');
  const [challengeType, setChallengeType] = useState('');
  const [challengeMode, setChallengeMode] = useState('');

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/icons/home.png')} />
          <Text style={styles.titles}>Create Challenges</Text>
          <Image source={require('../assets/icons/notifications.png')} />
        </View>
        <View style={{flex: 1}}>
          <ProgressSteps>
            <ProgressStep
              label="First Step"
              nextBtnText="Next"
              nextBtnStyle={{backgroundColor: 'white'}}
              nextBtnTextStyle={{color: 'white'}}>
              <View style={{alignItems: 'center'}}></View>
            </ProgressStep>
            <ProgressStep
              label="Second Step"
              nextBtnText="Next"
              previousBtnText="Back"
              nextBtnStyle={{backgroundColor: 'blue'}}
              nextBtnTextStyle={{color: 'white'}}
              previousBtnStyle={{backgroundColor: 'green'}}
              previousBtnTextStyle={{color: 'white'}}>
              <View style={{alignItems: 'center'}}>
                <View></View>
              </View>
            </ProgressStep>
            <ProgressStep label="Done" previousBtnText="Back">
              <View style={{alignItems: 'center'}}>
                <View></View>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  viewAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
