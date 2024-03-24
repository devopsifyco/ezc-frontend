import React, { useState, useRef, useEffect } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import Button from '../components/Button';
import { styles } from '../styles/signin-signup';
import { NavigateType } from '../models/Navigations';
import useVerify from '../hooks/useVerify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useResendCode from '../hooks/useResendCode';
import { useForm, Controller } from 'react-hook-form';

export default function VerifyRegisterScreen({ navigation }: NavigateType) {

  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountDown, setResendCountDown] = useState(60);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();

  const { mutate } = useVerify();
  const { mutate: resendCode } = useResendCode();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startResendCountDown = () => {
    setResendDisabled(true);

    intervalRef.current = setInterval(() => {
      setResendCountDown((prevCountDown) => {
        if (prevCountDown === 1) {
          clearInterval(intervalRef.current!);
          setResendDisabled(false);
          return 60;
        }
        return prevCountDown - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const errorMessage = "Invalid verification code. Please enter a valid code!";

  const handleVerify = async (data: any) => {
    try {
      const { code0, code1, code2, code3 } = data;
      const email = await AsyncStorage.getItem("email");

      if (email) {
        const code = code0 + code1 + code2 + code3;
        const dataVerify = { email, code };

        mutate(dataVerify, {
          onSuccess: () => {
            navigation.navigate('LoginScreen');
          },
          onError: () => {
            errorMessage;
            setErrorModalVisible(true);
          }
        });
      } else {
        Alert.alert('Email not found in AsyncStorage');
      }
    } catch (error) {
      console.log('Error retrieving email:', error);
      Alert.alert('Error retrieving email');
    }
  };

  const handleResendCode = async () => {
    try {
      const email = await AsyncStorage.getItem("email");

      await resendCode({ email: email });

      startResendCountDown();
    } catch (error) {
      console.error('Error resending verification code:', error);
    }
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
            <View style={styles.displayOneline}>
              <Text>Verification codes</Text>
              {errors.code0 || errors.code1 || errors.code2 || errors.code3 ? (
                <Text style={styles.errorText}>*</Text>
              ) : null}
            </View>
            <View style={styles.inputVerifyContainer}>
              {[0, 1, 2, 3].map((index) => (
                <View key={index} style={styles.inputVerify}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={[styles.titleBold, styles.titleLarge]}
                        maxLength={1}
                        keyboardType="numeric"
                        value={value}
                        onChangeText={(text) => {
                          setValue(`code${index}`, text);
                          if (text && index < 3) {
                            const nextInput = `code${index + 1}`;
                            setValue(nextInput, '');
                          }
                        }}
                      />
                    )}
                    name={`code${index}`}
                    rules={{ required: true, maxLength: 1 }}
                    defaultValue=""
                  />
                </View>
              ))}
            </View>
          </View>
          <Button onPress={handleSubmit(handleVerify)} title="Confirm code" />
          <View style={[styles.resendCode, styles.displayCenter]}>
            <Text style={[styles.titleSmall, styles.tileWhiteColor]}>Didn't get code?</Text>
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={[styles.titleBold, styles.titleSmall]}>
                {resendDisabled ? `Resend in ${resendCountDown}s` : 'Resend'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <Button title='Cancel' onPress={() => setErrorModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
