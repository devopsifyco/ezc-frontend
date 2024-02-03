import React, {useRef} from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import {styles} from './LoginScreen';
import {NavigateType} from '../models/Navigations';
import {useForm, Controller} from 'react-hook-form';

export default function RegisterScreen({navigation}: NavigateType) {
  const passwordRegisterRef = useRef<TextInput>(null);
  const userRef = useRef<TextInput>(null);
  const moveLogin = () => navigation.goBack();
  const moveMoreRegister = () => navigation.navigate('MoreRegisterScreen');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login/Logo.png')} />
      <Image
        source={require('../assets/login/background.png')}
        style={styles.imageBackground}
      />
      <ScrollView style={styles.formBackgrounRegister}>
        <View style={styles.formInput}>
          {errors.email ? (
            <Text style={styles.errorText}>
              {errors.email && errors.email.message}
            </Text>
          ) : (
            <Text>Email</Text>
          )}
          <View style={styles.inputContainter}>
            <Image source={require('../assets/login/email.png')} />
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
                  onSubmitEditing={() => userRef.current?.focus()}
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
            <Image source={require('../assets/login/user-icon.png')} />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
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
              rules={{required: 'User name is require!'}}
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
            <Image source={require('../assets/login/password.png')} />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  ref={passwordRegisterRef}
                  style={styles.input}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={text => onChange(text)}
                  placeholder="Enter your password"
                  placeholderTextColor="#00000080"
                  enterKeyHint={'done'}
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
        <Button onPress={handleSubmit(moveMoreRegister)} title="Next step" />
        <View style={styles.moreLogin}>
          <Image source={require('../assets/login/arrowLeft.png')} />
          <Text style={styles.titleSmall}>Or continue with</Text>
          <Image source={require('../assets/login/arrowRight.png')} />
        </View>
        <LoginOptions />
      </ScrollView>
    </View>
  );
}
