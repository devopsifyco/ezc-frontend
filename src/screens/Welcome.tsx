import React, {useEffect} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

export function Welcome({navigation}: any) {
  useEffect(() => {
    const handleGetStart = async () => {
      try {
        const getToken = await AsyncStorage.getItem('accessToken');

        if (getToken !== null) {
          navigation.replace('EZChallenge');
        } else {
          navigation.navigate('Welcome2');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    const timer = setTimeout(() => {
      handleGetStart();
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
  const navigateWelcom3 = () => {
    AsyncStorage.setItem('welcomeCompleted', 'false');
    navigation.navigate('Welcome3');
  };

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
  const handleCheckScreen = async () => {
    try {
      const welcomeCompleted = await AsyncStorage.getItem('welcomeCompleted');

      if (welcomeCompleted === 'true') {
        navigation.reset({
          index: 0,
          routes: [{name: 'EZChallenge'}],
        });
      } else {
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.error('Error checking screen:', error);
    }
  };

  const handleLogin = () => {
    handleCheckScreen();
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
        <Button title="Next" onPress={handleLogin} />
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
