import React, {useRef} from 'react';
import {Alert, Image, Text, TextInput, View} from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import {styles} from '../styles/signin-signup';
import {NavigateType} from '../models/Navigations';
import {useForm, Controller} from 'react-hook-form';
import {RegistrationData} from '../models/Register';
import useRegister from '../hooks/useRegister';

export default function MoreRegisterScreen({navigation}: NavigateType) {
  const confirmPasswordRef = useRef<TextInput>(null);
  const {mutate} = useRegister();

  const handleRegister = async (data: RegistrationData) => {
    const {username, email, password} = data;
    const confirmPassword = confirmPasswordRef.current?.value || '';
    if (password !== confirmPassword) {
      Alert.alert('Password do not match!');
    } else {
      try {
        await mutate({
          username,
          email,
          password,
        });
        navigation.navigate('VerifyRegisterScreen');
      } catch (error) {
        Alert.alert('Register Failed!');
      }
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      confirmPassword: '',
    },
  });

  const onSubmit = (data: {confirmPassword: string}) => {
    // Wrap handleRegister to match the expected type of handleSubmit
    handleRegister({...data, username: '', email: '', password: ''});
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/signin_signup/logo.png')} />
      <Image
        source={require('../assets/signin_signup/background.png')}
        style={styles.imageBackground}
      />
      <View style={styles.formBackground}>
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
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  ref={confirmPasswordRef}
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#00000080"
                  enterKeyHint={'done'}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={text => onChange(text)}
                />
              )}
              name="confirmPassword"
              rules={{required: 'Confirm Password is required!'}}
            />
          </View>
        </View>
        <Button onPress={handleSubmit(onSubmit)} title="Register" />
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
