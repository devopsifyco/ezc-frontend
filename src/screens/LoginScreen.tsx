import React, {useRef} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import {NavigateType} from '../models/Navigations';
import {styles} from '../styles/signin-signup';

export default function LoginScreen({navigation}: NavigateType) {
  const passwordRegisterRef = useRef<TextInput>(null);
  const userRef = useRef<TextInput>(null);
  const moveRegister = () => navigation.navigate('RegisterScreen');
  const moveForgotPassword = () => navigation.navigate('ForgotPassword');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/signin_signup/logo.png')} />
      <Image
        source={require('../assets/signin_signup/background.png')}
        style={styles.imageBackground}
      />
      <View style={styles.formBackground}>
        <View style={styles.formInput}>
          <Text>Email</Text>
          <View style={styles.inputContainter}>
            <Image source={require('../assets/signin_signup/email-icon.png')} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#00000080"
              enterKeyHint={'next'}
              onSubmitEditing={() => userRef.current?.focus()}
            />
          </View>
        </View>

        <View style={styles.formInput}>
          <Text>Password</Text>
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
        <View style={styles.moreOption}>
          <View style={styles.options}>
            <Text style={[styles.titleSmall, styles.tileWhiteColor]}>
              You can{' '}
              <TouchableOpacity onPress={moveRegister}>
                <Text style={[styles.titleSmall, styles.titleBold]}>
                  Register
                </Text>
              </TouchableOpacity>{' '}
              here!
            </Text>
          </View>
          <TouchableOpacity onPress={moveRegister}>
            <Text style={[styles.titleSmall, styles.titleBold]}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <Button onPress={moveForgotPassword} title="Login" />
        <LoginOptions />
      </View>
    </View>
  );
}
