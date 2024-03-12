import React, { useState, useRef, useEffect } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import { styles } from '../styles/signin-signup';
import { NavigateType } from '../models/Navigations';
import useVerify from '../hooks/useVerify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useResendCode from '../hooks/useResendCode';

export default function VerifyRegisterScreen({ navigation }: NavigateType) {
  const [verificationCodes, setVerificationCodes] = useState(['', '', '', '']);
  const verificationCodeRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const { mutate } = useVerify();
  const { mutate: resendCode } = useResendCode();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountDown, setResendCountDown] = useState(60);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleVerify = async () => {
    try {
      const code = verificationCodes.join('');
      const email = await AsyncStorage.getItem("email");

      if (email) {
        const dataVerify = { email, code };

        mutate(dataVerify, {
          onSuccess: () => {
            navigation.navigate('LoginScreen');
          },
          onError: (error) => {
            console.log(error?.response.data.message);
          }
        });
      } else {
        Alert.alert('Email not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving email:', error);
      Alert.alert('Error retrieving email');
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    setVerificationCodes(prevCodes => {
      const newCodes = [...prevCodes];
      newCodes[index] = value;
      return newCodes;
    });

    if (value !== '' && index < 3) {
      verificationCodeRefs[index + 1].current?.focus();
    }
  };

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

  const handleResendCode = async () => {
    try {
      const email = await AsyncStorage.getItem("email");

      await resendCode({ email: email });

      startResendCountDown(); // Khởi động đếm lại khi nhấn nút Resend
    } catch (error) {
      console.error('Error resending verification code:', error);
      Alert.alert('Error resending verification code');
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
            <Text>Verification codes</Text>
            <View style={styles.inputVerifyContainer}>
              {verificationCodes.map((code, index) => (
                <View key={index} style={styles.inputVerify}>
                  <TextInput
                    ref={verificationCodeRefs[index]}
                    style={[styles.titleBold, styles.titleLarge]}
                    maxLength={1}
                    keyboardType="numeric"
                    value={code}
                    onChangeText={text => handleCodeInput(index, text)}
                  />
                </View>
              ))}
            </View>
          </View>
          <Button onPress={handleVerify} title="Confirm code" />
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
    </View>
  );
}
