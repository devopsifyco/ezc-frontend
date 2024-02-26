import React, {useEffect} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export function Welcome({navigation}: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome2');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, styles.displayCenter2]}>
      <Image source={require('../assets/images/welcome.png')} />
    </View>
  );
}

export function Welcome2({navigation}: any) {
  const navigateWelcom3 = () => navigation.navigate('Welcome3');

  return (
    <>
      <View style={styles.container}>
        <Image source={require('../assets/signin_signup/logo.png')} />
        <Image
          style={styles.image}
          source={require('../assets/images/welcome2.png')}
        />
      </View>
      <View style={[styles.background]}>
        <View style={styles.displayCenter}>
          <Text style={styles.titleLarge}>Welcome</Text>
          <Text style={styles.titleSmall}>
            We believe that recognition and gratitude to the community motivates
            each individual to be 1% greener every day.
          </Text>
        </View>
        <Button title="Next" onPress={navigateWelcom3} />
      </View>
    </>
  );
}

export function Welcome3({navigation}: any) {
  const handleGetStart = async () => {
    try {
      const getToken = await AsyncStorage.getItem('accessToken');
      console.log(getToken);

      if (getToken !== null) {
        navigation.navigate('EZChallenge');
      } else {
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={require('../assets/signin_signup/logo.png')} />
        <Image source={require('../assets/signin_signup/background.png')} />
      </View>
      <View style={styles.background}>
        <View style={styles.displayCenter}>
          <Text style={styles.titleMedium}>
            Join the challenge with friends and everyone
          </Text>
        </View>
        <Button title="Next" onPress={handleGetStart} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 45,
  },
  image: {
    height: 250,
    width: '100%',
  },
  background: {
    position: 'absolute',
    backgroundColor: '#216C53',
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    paddingHorizontal: 20,
    gap: 10,
    paddingBottom: 30,
    bottom: '0%',
  },
  titleLarge: {fontSize: 28, fontWeight: 'bold'},
  titleMedium: {fontSize: 22, fontWeight: 'bold', textAlign: 'center'},
  titleSmall: {fontSize: 15, fontWeight: 'bold', textAlign: 'center'},
  displayCenter: {alignItems: 'center', gap: 10, justifyContent: 'center'},
  displayCenter2: {justifyContent: 'center'},
});
