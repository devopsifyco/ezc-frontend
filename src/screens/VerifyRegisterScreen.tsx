import React, {useState, useRef} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import Button from '../components/Button';
import LoginOptions from '../components/LoginOptions';
import {styles} from '../styles/signin-signup';
import {NavigateType} from '../models/Navigations';

export default function VerifyRegisterScreen({navigation}: NavigateType) {
  const [verificationCodes, setVerificationCodes] = useState(['', '', '', '']);
  const verificationCodeRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleVerify = () => {
    const code = verificationCodes.join('');
    // Perform verification logic with the 'code'
    // For now, just navigate to LoginScreen
    navigation.navigate('LoginScreen');
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

  return (
    <View style={styles.container}>
      <Image source={require('../assets/signin_signup/logo.png')} />
      <Image
        source={require('../assets/signin_signup/background.png')}
        style={styles.imageBackground}
      />
      <View style={styles.formBackground}>
        <View style={styles.formInput}>
          <Text>Verification codes</Text>
          <View style={styles.inputVerify}>
            {verificationCodes.map((code, index) => (
              <View
                key={index}
                style={[styles.inputContainter, styles.itemVerify]}>
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
