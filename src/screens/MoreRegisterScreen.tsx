import React, {useRef} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import {styles} from './LoginScreen';
import {NavigateType} from '../models/Navigations';

export default function MoreRegisterScreen({navigation}: NavigateType) {
  const passwordRegisterRef = useRef<TextInput>(null);
  const handleRegister = () => navigation.navigate('VerifyRegisterScreen');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login/Logo.png')} />
      <Image
        source={require('../assets/login/background.png')}
        style={styles.imageBackground}
      />
      <View style={styles.formBackground}>
        <View style={styles.formInput}>
          <Text>Confirm password</Text>
          <View style={styles.inputContainter}>
            <Image source={require('../assets/login/password.png')} />
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
          <Image source={require('../assets/login/arrowLeft.png')} />
          <Text style={styles.titleSmall}>Or continue with</Text>
          <Image source={require('../assets/login/arrowRight.png')} />
        </View>
        <LoginOptions />
      </View>
    </View>
  );
}
