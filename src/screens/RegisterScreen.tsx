import React, { useRef, useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Button } from '../components/Button';
import { styles } from '../styles/signin-signup';
import { NavigateType } from '../models/Navigations';
import { useForm, Controller } from 'react-hook-form';
import { RegistrationData } from '../models/Register';
import useRegister from '../hooks/useRegister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { EZCHALLENGE_API } from '../api/endPoint';
import * as Progress from 'react-native-progress';

export default function RegisterScreen({ navigation }: NavigateType) {
  const userNameRef = useRef<TextInput>(null);
  const passwordRegisterRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  }

  const moveLogin = () => navigation.goBack();

  const { mutate, isPending } = useRegister();


  const onSubmit = (data: RegistrationData) => {
    if (data.password === data.confirmPassword) {
      mutate(data, {
        onSuccess: async () => {
          AsyncStorage.setItem('email', data.email);
          try {
            await axios.post(
              `${EZCHALLENGE_API}/send-verification-code`,
              {
                email: data.email,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );
          } catch (error) {
            console.log(error);
          }
          navigation.navigate('VerifyRegisterScreen');
        },
      });
    } else {
      Alert.alert('Confirm password does not match with password!');
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <View style={styles.container}>
      {isPending && (
        <View style={styles.displayLoading}>
          <Progress.CircleSnail color={'white'} size={65} />
        </View>
      )}
      <Image
        style={styles.logo}
        source={require('../assets/signin_signup/logo.png')}
      />
      <Image
        source={require('../assets/signin_signup/background.png')}
        style={styles.imageBackground}
      />
      <ScrollView style={styles.formBackground}>
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#00000080"
                    onChangeText={text => onChange(text)}
                    onBlur={onBlur}
                    value={value}
                    enterKeyHint={'next'}
                    onSubmitEditing={() => userNameRef.current?.focus()}
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
            {errors.username ? (
              <Text style={styles.errorText}>
                {errors.username && errors.username.message}
              </Text>
            ) : (
              <Text>User name</Text>
            )}
            <View style={styles.inputContainter}>
              <Image
                source={require('../assets/signin_signup/user-icon.png')}
              />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    ref={userNameRef}
                    style={styles.input}
                    placeholder="Enter your user name"
                    placeholderTextColor="#00000080"
                    onChangeText={text => onChange(text)}
                    onBlur={onBlur}
                    value={value}
                    enterKeyHint={'next'}
                    onSubmitEditing={() => passwordRegisterRef.current?.focus()}
                  />
                )}
                name="username"
                rules={{ required: 'User name is require!' }}
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    ref={passwordRegisterRef}
                    style={styles.input}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={text => onChange(text)}
                    placeholder="Enter your password"
                    placeholderTextColor="#00000080"
                    secureTextEntry={!showPassword}
                    enterKeyHint={'next'}
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  />
                )}
                name="password"
                rules={{
                  required: 'Password is require!',
                  minLength: {
                    value: 8,
                    message: 'Password must be 8 characters!',
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
          <View style={styles.formInput}>
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            ) : (
              <Text>Confirm password</Text>
            )}
            <View style={styles.inputContainter}>
              <Image
                source={require('../assets/signin_signup/password-icon.png')}
              />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    ref={confirmPasswordRef}
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#00000080"
                    enterKeyHint={'done'}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={text => onChange(text)}
                    secureTextEntry={!showConfirmPassword}

                  />
                )}
                name="confirmPassword"
                rules={{ required: 'Confirm Password is required!' }}
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Image
                  source={
                    showConfirmPassword
                      ? require('../assets/signin_signup/open-eye.png')
                      : require('../assets/signin_signup/close-eye.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <Button onPress={handleSubmit(onSubmit)} title="Register" />
          <View style={[styles.options, styles.setCenter]}>
            <Text style={[styles.titleSmall, styles.tileWhiteColor]}>
              Already have you an account?{' '}
              <TouchableOpacity onPress={moveLogin}>
                <Text
                  style={[
                    styles.titleSmall,
                    styles.titleBold,
                    styles.textRegister,
                  ]}>
                  Login
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
