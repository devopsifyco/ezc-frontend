import React from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import {styles} from './LoginScreen';
import {NavigateType} from '../models/Navigations';

export default function VerifyRegisterScreen({navigation}: NavigateType) {
  const handleVerify = () => navigation.navigate('LoginScreen');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login/Logo.png')} />
      <Image
        source={require('../assets/login/background.png')}
        style={styles.imageBackground}
      />
      <View style={styles.formBackground}>
        <View style={styles.formInput}>
          <Text>Verification codes</Text>
          <View style={styles.inputVerify}>
            <View style={[styles.inputContainter, styles.itemVerify]}>
              <TextInput
                style={[styles.titleBold, styles.titleLarge]}
                maxLength={1}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainter, styles.itemVerify]}>
              <TextInput
                style={[styles.titleBold, styles.titleLarge]}
                maxLength={1}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainter, styles.itemVerify]}>
              <TextInput
                style={[styles.titleBold, styles.titleLarge]}
                maxLength={1}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainter, styles.itemVerify]}>
              <TextInput
                style={[styles.titleBold, styles.titleLarge]}
                maxLength={1}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        <Button onPress={handleVerify} title="Confirm code" />
        <View style={styles.moreLogin}>
          <Image source={require('../assets/login/arrowLeft.png')} />
          <Text style={styles.titleSmall}>Or continue with</Text>
          <Image source={require('../assets/login/arrowRight.png')} />
        </View>
        <LoginOptions />
      </View>
    </View>
  );
}
