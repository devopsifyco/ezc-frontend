import React, { useState, useRef, useEffect } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import { styles } from '../styles/signin-signup';
import { NavigateType } from '../models/Navigations';
// import useVerify from '../hooks/useVerify';
import { VerifyData } from '../models/Verify';

export default function VerifyRegisterScreen({ navigation }: NavigateType) {
  const [verificationCodes, setVerificationCodes] = useState(['', '', '', '']);
  const verificationCodeRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  // const { mutate } = useVerify();

  const handleVerify = () => {
    navigation.navigate('LoginScreen');
  };

  // const sendCode = (data: VerifyData) => {
  //   mutate(data, {
  //     onSuccess: () => {
  //       console.log("Verify is ok");
  //       navigation.navigate('LoginScreen');
  //     },
  //   })
  // }


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
          {/* <Button onPress={sendCode} title="Send code" /> */}
          <Button onPress={handleVerify} title="Confirm code" />
          <LoginOptions />
        </View>
      </View>
    </View>
  );
}
