import React, {useRef} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import {styles} from '../styles/signin-signup';
import {NavigateType} from '../models/Navigations';

export default function MoreRegisterScreen({navigation}: NavigateType) {
  const passwordRegisterRef = useRef<TextInput>(null);
  const handleRegister = () => navigation.navigate('VerifyRegisterScreen');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/signin_signup/logo.png')} />
      <Image
        source={require('../assets/signin_signup/background.png')}
        style={styles.imageBackground}
      />
      <View style={styles.formBackground}>
        <View style={styles.formInput}>
          <Text>Confirm password</Text>
          <View style={styles.inputContainter}>
            <Image
              source={require('../assets/signin_signup/password-icon.png')}
            />
            <TextInput
              ref={passwordRegisterRef}
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#00000080"
              enterKeyHint={'done'}
            />
          </View>
        </View>
        <Button onPress={handleRegister} title="Register" />
        <View style={styles.moreLogin}>
          <Image source={require('../assets/signin_signup/arrowLeft.png')} />
          <Text style={styles.titleSmall}>Or continue with</Text>
          <Image source={require('../assets/signin_signup/arrowRight.png')} />
        </View>
        <LoginOptions />
      </View>
    </View>
  );
}
