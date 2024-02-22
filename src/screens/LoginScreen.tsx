import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import {NavigateType} from '../models/Navigations';
import {styles} from '../styles/signin-signup';
import {useForm, Controller} from 'react-hook-form';
import useLogin from '../hooks/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}: NavigateType) {
  const passwordLoginRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonString = await AsyncStorage.getItem('userData');
        // if (jsonString !== null) {
          // const userData = JSON.parse(jsonString);
          navigation.navigate('EZChallenge');
        // }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const moveRegister = () => navigation.navigate('RegisterScreen');
  const moveForgotPassword = () => navigation.navigate('ForgotPassword');
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const {mutate} = useLogin();

  const handleLogin = (fromData: any) => {
    mutate(fromData, {
      onSuccess: () => {
        const jsonString = JSON.stringify(fromData);
        AsyncStorage.setItem('userdata', jsonString);
        navigation.navigate('EZChallenge');
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/signin_signup/logo.png')}
      />
      <Image
        source={require('../assets/signin_signup/background.png')}
        style={styles.imageBackground}
      />
      <View style={styles.formBackground}>
        <View style={styles.formContainer}>
          <View style={styles.formInput}>
            {errors.email ? (
              <Text style={styles.errorText}>
                {errors.email && errors.email.message}
              </Text>
            ) : (
              <Text>Email</Text>
            )}
            <View style={styles.inputContainter}>
              <Image
                source={require('../assets/signin_signup/email-icon.png')}
              />
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#00000080"
                    onChangeText={text => onChange(text)}
                    onBlur={onBlur}
                    value={value}
                    enterKeyHint={'next'}
                    onSubmitEditing={() => passwordLoginRef.current?.focus()}
                  />
                )}
                name="email"
                rules={{
                  required: 'Email is require!',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
              />
            </View>
          </View>

          <View style={styles.formInput}>
            {errors.password ? (
              <Text style={styles.errorText}>
                {errors.password && errors.password.message}
              </Text>
            ) : (
              <Text>Password</Text>
            )}
            <View style={styles.inputContainter}>
              <Image
                source={require('../assets/signin_signup/password-icon.png')}
              />
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={passwordLoginRef}
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#00000080"
                    onChangeText={text => onChange(text)}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={!showPassword}
                    enterKeyHint="done"
                  />
                )}
                name="password"
                rules={{
                  required: 'Password is required!',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                }}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  source={
                    showPassword
                      ? require('../assets/signin_signup/open-eye.png')
                      : require('../assets/signin_signup/close-eye.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.moreOption}>
            <View style={styles.options}>
              <Text style={[styles.titleSmall, styles.tileWhiteColor]}>
                You can{' '}
                <TouchableOpacity onPress={moveRegister}>
                  <Text
                    style={[
                      styles.titleSmall,
                      styles.titleBold,
                      styles.textRegister,
                    ]}>
                    Register
                  </Text>
                </TouchableOpacity>{' '}
                here!
              </Text>
            </View>
            <TouchableOpacity onPress={moveForgotPassword}>
              <Text style={[styles.titleSmall, styles.titleBold]}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <Button onPress={handleSubmit(handleLogin)} title="Login" />
          <LoginOptions />
        </View>
      </View>
    </View>
  );
}
