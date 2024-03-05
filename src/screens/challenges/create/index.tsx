import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import StepOneScreen from './StepOneScreen';
import StepTwoScreen from './StepTwoScreen';
import FinalStep from './FinalStep';
import {useNavigation} from '@react-navigation/native';

const CreateChallenges = ({route}: any) => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const stepParam = route.params?.step;
    if (stepParam) {
      setCurrentStep(stepParam);
    }
  }, [route.params]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOneScreen />;
      case 2:
        return <StepTwoScreen />;
      case 3:
        return <FinalStep />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/icons/home.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.titleLarge}>Create Challenges</Text>
          </View>
        </View>
        <View style={styles.formBackground}>{renderStep()}</View>
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  displayError: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  formBackground: {
    top: 20,
  },
  stepContainer: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    gap: 50,
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
    borderBottomWidth: 2,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    color: '#363636',
    width: '100%',
  },
  inputDes: {
    height: 100,
  },
  mediaContainer: {
    paddingTop: 10,
    paddingBottom: 10,
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
    width: '45%',
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayLoading: {
    position: 'absolute',
    zIndex: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3550',
    opacity: 0.6,
    width: '100%',
    height: '100%',
  },
});

export default CreateChallenges;
