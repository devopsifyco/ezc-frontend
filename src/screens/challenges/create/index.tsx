import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image, Alert} from 'react-native';
import Stepper from 'react-native-stepper-ui';
import StepOneScreen from './StepOneScreen';
import StepTwoScreen from './StepTwoScreen';
import FinalStep from './FinalStep';

const CreateChallenges = () => {
  const [active, setActive] = React.useState(0);

  const challengeSteps = [
    <StepOneScreen key={0} />,
    <StepTwoScreen key={1} />,
    <FinalStep key={2} />,
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.header}>
          <Image source={require('../../../assets/icons/home.png')} />
          <Text style={styles.titleLarge}>Create Challenges</Text>
          <Image source={require('../../../assets/icons/notifications.png')} />
        </View>
        <View style={styles.formBackground}>
          <Stepper
            buttonStyle={styles.buttonStep}
            buttonTextStyle={styles.textStep}
            active={active}
            content={challengeSteps}
            onBack={() => setActive(prev => prev - 1)}
            onFinish={() => Alert.alert('Finish')}
            onNext={() => setActive(prev => prev + 1)}
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
  imageLarge: {width: 320, height: 220},
  imageMedium: {width: 102, height: 100},
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
});

export default CreateChallenges;
