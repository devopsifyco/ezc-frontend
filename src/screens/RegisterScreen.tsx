import React, {useRef} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import {styles} from '../styles/signin-signup';
import {NavigateType} from '../models/Navigations';

export default function RegisterScreen({navigation}: NavigateType) {
  const passwordRegisterRef = useRef<TextInput>(null);
  const userRef = useRef<TextInput>(null);
  const handleLogin = null;
  const moveLogin = () => navigation.goBack();
  const moveMoreRegister = () => navigation.navigate('MoreRegisterScreen');

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
          <Text>User name</Text>
          <View style={styles.inputContainter}>
            <Image source={require('../assets/signin_signup/user-icon.png')} />
            <TextInput
              ref={userRef}
              style={styles.input}
              placeholder="Enter your user name"
              placeholderTextColor="#00000080"
              enterKeyHint={'next'}
              onSubmitEditing={() => passwordRegisterRef.current?.focus()}
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
        <View style={[styles.options, styles.setCenter]}>
          <Text style={[styles.titleSmall, styles.tileWhiteColor]}>
            Already have you an account?{' '}
            <TouchableOpacity onPress={moveLogin}>
              <Text style={[styles.titleSmall, styles.titleBold]}>Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <Button onPress={moveMoreRegister} title="Next step" />
        <LoginOptions />
      </View>
    </View>
  );
}
