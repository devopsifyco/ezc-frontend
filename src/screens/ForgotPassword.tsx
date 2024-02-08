import React from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import {styles} from './LoginScreen';
import {NavigateType} from '../models/Navigations';
import {Controller, useForm} from 'react-hook-form';

export default function ForgotPassword({navigation}: NavigateType) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const handleVerification = () => navigation.navigate('VerifyRegisterScreen');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login/Logo.png')} />
      <Image
        source={require('../assets/login/background.png')}
        style={styles.imageBackground}
      />
      <View style={styles.formBackgroundLogin}>
        <View style={styles.formInput}>
          {errors.email ? (
            <Text style={styles.errorText}>
              {errors.email && errors.email.message}
            </Text>
          ) : (
            <Text>Email or phone number</Text>
          )}

          <View style={styles.inputContainter}>
            <Image source={require('../assets/login/email.png')} />
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is require!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#00000080"
                  onBlur={onBlur}
                  onChangeText={text => onChange(text)}
                  value={value}
                />
              )}
            />
          </View>
        </View>
        <Button onPress={handleSubmit(handleVerification)} title="Send code" />
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
