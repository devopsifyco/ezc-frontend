import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

const ULR_IMAGE = '../assets/signin_signup/';

export default function LoginOptions() {
  return (
    <View style={styles.container}>
      <View style={styles.moreLoginItem}>
        <Image source={require(`${ULR_IMAGE}arrowLeft.png`)} />
        <Text>Or continue with</Text>
        <Image source={require(`${ULR_IMAGE}arrowRight.png`)} />
      </View>
      <View style={styles.optionLogin}>
        <TouchableOpacity style={styles.buttonOption}>
          <Image source={require(`${ULR_IMAGE}google-icon.png`)} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOption}>
          <Image source={require(`${ULR_IMAGE}apple-icon.png`)} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOption}>
          <Image source={require(`${ULR_IMAGE}facebook-icon.png`)} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  moreLoginItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  optionLogin: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
  },
  buttonOption: {
    backgroundColor: 'rgba(63, 218, 133, 0.2)',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
