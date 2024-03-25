import React, { useRef } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { Button } from '../components/Button';
import { styles } from '../styles/signin-signup';
import { NavigateType } from '../models/Navigations';
import { useForm, Controller } from 'react-hook-form';

export default function ConfirmPasswordScreen({ navigation }: NavigateType) {
  const passwordRegisterRef = useRef<TextInput>(null);

  const handleRegister = () => navigation.navigate('VerifyRegisterScreen');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confirmPassword: '',
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login/Logo.png')} />
      <Image
        source={require('../assets/login/background.png')}
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
            <Image source={require('../assets/login/password.png')} />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={passwordRegisterRef}
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
              rules={{ required: 'Confirm Password is required!' }}
            />
          </View>
        </View>
        <Button onPress={handleSubmit(handleRegister)} title="Register" />
      </View>
    </View>
  );
}
